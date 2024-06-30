import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "DRN | Home",
  description: "Disaster Response Network",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div
          className={"fixed w-full h-full z-[-1]"}
          style={{
            backgroundImage: "url(/images/background.jpg)",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            opacity: 0.25,
          }}
        ></div>
        <Navbar />
        <div className="horizontal-center lg:max-w-4xl w-full mx-5 md:mx-10 lg:mx-auto p-2">
          {children}
        </div>
      </body>
    </html>
  );
}
