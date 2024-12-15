'use client'
import { ReactNode } from "react";
import { Poppins } from 'next/font/google';
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

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
      <html lang="en" className={`${poppins.variable} font-sans`}>
        <body className="bg-gradient-to-br from-purple-50 via-white to-purple-50 text-gray-900 min-h-screen flex flex-col">
          {!shouldHide && <Header />}
          <main className="flex-grow">{children}</main>
          {!shouldHide && <Footer />}
        </body>
      </html>
    </ClerkProvider>
  );
}

