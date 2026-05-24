const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const pngToIcoModule = require("png-to-ico");
const pngToIco = pngToIcoModule.default ?? pngToIcoModule;

const publicDir = path.resolve(__dirname, "..", "public");
const srcSvgPath = path.join(
  publicDir,
  "assets",
  "graphics",
  "RJ-Logo-Fix.svg",
);
const svgSource = fs.readFileSync(srcSvgPath, "utf8");
const svgBase64 = Buffer.from(svgSource, "utf8").toString("base64");
const wrapperSvg = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\n  <defs>\n    <clipPath id="circleClip">\n      <circle cx="256" cy="256" r="256"/>\n    </clipPath>\n    <filter id="goldTint" color-interpolation-filters="sRGB">\n      <feColorMatrix type="matrix" values="0.55 0.55 0.55 0 0 0.42 0.42 0.42 0 0 0.13 0.13 0.13 0 0 0 0 0 1 0"/>\n    </filter>\n  </defs>\n  <rect width="512" height="512" rx="256" fill="#ffffff"/>\n  <image clip-path="url(#circleClip)" filter="url(#goldTint)" href="data:image/svg+xml;base64,${svgBase64}" x="-224" y="-224" width="960" height="960" preserveAspectRatio="xMidYMid slice"/>\n</svg>`;

fs.writeFileSync(path.join(publicDir, "icon-rounded.svg"), wrapperSvg, "utf8");

async function renderSvgToPng(svg, width, height) {
  return sharp(Buffer.from(svg))
    .resize(width, height, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .png()
    .toBuffer();
}

async function generateIcons() {
  const icon512 = await renderSvgToPng(wrapperSvg, 512, 512);
  fs.writeFileSync(path.join(publicDir, "icon.png"), icon512);

  const apple180 = await renderSvgToPng(wrapperSvg, 180, 180);
  fs.writeFileSync(path.join(publicDir, "apple-icon.png"), apple180);

  const icon256 = await renderSvgToPng(wrapperSvg, 256, 256);
  const icoBuffer = await pngToIco(icon256);
  fs.writeFileSync(path.join(publicDir, "favicon.ico"), icoBuffer);

  console.log(
    "Generated icon-rounded.svg, icon.png, apple-icon.png, and favicon.ico",
  );
}

generateIcons().catch((err) => {
  console.error("Icon generation failed:", err);
  process.exit(1);
});
