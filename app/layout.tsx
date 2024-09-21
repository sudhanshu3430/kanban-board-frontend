"use client"
import { Toaster } from "@/components/ui/toaster";

import localFont from "next/font/local";
import "./globals.css";
import { AppBar } from "@/components/AppBar";
import { RecoilRoot } from "recoil";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RecoilRoot>

    <html lang="en">
    <head>
        <title>Todo App</title>
        <meta name='description' content='Description' />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
    
          <AppBar />
          {children}
          <Toaster />
       
      </body>
    </html>
    </RecoilRoot>
  );
}
