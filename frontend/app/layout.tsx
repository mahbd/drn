import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components";
import { ReactNode } from "react";
import Footer from "@/components/Footer";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

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
            opacity: 0.2,
          }}
        ></div>
        <div className={"flex flex-col min-h-screen"}>
          <main className={"flex-grow lg:mx-10"}>
            <Navbar />
            <div className="horizontal-center lg:max-w-4xl w-full mx-5 md:mx-10 lg:mx-auto p-2">
              {children}
            </div>
            <button className="fixed bottom-5 md:bottom-32 right-5 z-50 text-white shadow-lg focus:outline-none focus:shadow-outline transform hover:scale-110">
              <div
                className={
                  "py-2 px-4 rounded-2xl text-5xl text-primary flex justify-center"
                }
              >
                <IoChatbubbleEllipsesOutline />
              </div>
              <p className={"bg-primary py-2 px-4 rounded-2xl"}>
                Chat with DiRi
              </p>
            </button>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
