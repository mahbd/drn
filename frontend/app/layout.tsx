"use client";

import "./globals.css";
import { ReactNode } from "react";
import Footer from "@/components/Footer";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Link from "next/link";
import { ROUTING } from "@/store/config";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en" data-theme={"light"}>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin={"anonymous"}
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@200..900&display=swap"
            rel="stylesheet"
          />
          <title>DRN</title>
        </head>
        <body>
          <Toaster />
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
              <Link
                href={ROUTING.chat}
                className="fixed bottom-5 md:bottom-32 right-5 z-50 text-white shadow-lg focus:outline-none focus:shadow-outline transform hover:scale-110"
              >
                <div
                  className={
                    "py-2 px-4 rounded-2xl text-5xl text-primary flex justify-center"
                  }
                >
                  <IoChatbubbleEllipsesOutline />
                </div>
                <p
                  className={"hidden md:block bg-primary py-2 px-4 rounded-2xl"}
                >
                  Chat with DiRi
                </p>
              </Link>
            </main>
            <Footer />
          </div>
        </body>
      </html>
    </QueryClientProvider>
  );
}
