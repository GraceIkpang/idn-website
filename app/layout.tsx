import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { MotionProvider } from "@/components/ui/motion-provider";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit-family", display: "swap" });

export const metadata: Metadata = {
  title: "IDN | Power, networking and software",
  description:
    "IDN delivers alternative power, enterprise networking and custom software for homes and businesses across Nigeria.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="font-outfit">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
