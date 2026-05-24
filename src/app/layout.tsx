import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const rjLogo = "/assets/graphics/RJ-Logo-Fix.svg";
const rjIconVersion = "rj-logo-fill";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://wedding.example.com"),
  title: "The Wedding of Rifki & Jeni | Official Invitation",
  description:
    "Join us in celebrating the love and union of Rifki & Jeni. A premium cinematic wedding experience.",
  applicationName: "Rifki & Jeni Wedding",
  icons: {
    icon: [
      {
        url: `/icon-rounded.svg?v=${rjIconVersion}`,
        type: "image/svg+xml",
        sizes: "any",
      },
      {
        url: `/favicon.ico?v=${rjIconVersion}`,
        sizes: "any",
      },
      {
        url: `/icon.png?v=${rjIconVersion}`,
        type: "image/png",
        sizes: "512x512",
      },
    ],
    shortcut: [
      {
        url: `/icon-rounded.svg?v=${rjIconVersion}`,
        type: "image/svg+xml",
        sizes: "any",
      },
      {
        url: `/favicon.ico?v=${rjIconVersion}`,
        sizes: "any",
      },
    ],
    apple: [
      {
        url: `/apple-icon.png?v=${rjIconVersion}`,
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },
  openGraph: {
    title: "The Wedding of Rifki & Jeni",
    description: "You are cordially invited to our wedding celebration.",
    type: "website",
    url: "https://wedding.example.com",
    images: [
      {
        url: rjLogo,
        width: 1440,
        height: 810,
        alt: "Rifki & Jeni Wedding Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Wedding of Rifki & Jeni",
    description: "Join us in celebrating our special day.",
    images: [rjLogo],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} scroll-smooth antialiased`}
    >
      <body className="bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
