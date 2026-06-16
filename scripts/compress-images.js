const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const imagesDir = path.resolve(__dirname, "..", "public", "assets", "images");

async function compress() {
  const files = [
    { name: "opening.jpeg", width: 1200, quality: 75 }
  ];

  for (const file of files) {
    const filePath = path.join(imagesDir, file.name);
    const tempPath = path.join(imagesDir, "temp-" + file.name);

    if (fs.existsSync(filePath)) {
      const oldSize = fs.statSync(filePath).size;
      console.log(`Compressing ${file.name} (Original size: ${(oldSize / 1024 / 1024).toFixed(2)} MB)...`);

      await sharp(filePath)
        .resize({ width: file.width, withoutEnlargement: true })
        .jpeg({ quality: file.quality, progressive: true })
        .toFile(tempPath);

      fs.unlinkSync(filePath);
      fs.renameSync(tempPath, filePath);

      const newSize = fs.statSync(filePath).size;
      console.log(`Compressed ${file.name} successfully to ${(newSize / 1024).toFixed(2)} KB (Saved: ${((oldSize - newSize) / 1024 / 1024).toFixed(2)} MB).`);
    } else {
      console.warn(`File not found: ${file.name}`);
    }
  }
}

compress().catch((err) => {
  console.error(err);
  process.exit(1);
});
