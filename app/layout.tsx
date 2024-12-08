'use client'
import { ReactNode } from "react";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

/* eslint-disable */
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});


interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();

  const hideHeaderFooter = ["/sign-in", "/sign-up"];

  const shouldHide = hideHeaderFooter.includes(pathname);
  
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <title>EvenTNi - Discover The Best Local Events</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
          <Script src="https://kit.fontawesome.com/33f8496b80.js" crossOrigin="anonymous"></Script>
        </head>
        <body className="app">
          {!shouldHide && <Header />}
            {children}
          {!shouldHide && <Footer />}
        </body>
      </html>
    </ClerkProvider>
  );
}
