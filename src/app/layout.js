"use client";

import { usePathname } from "next/navigation";
import { Montserrat } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Hide header/nav on login/signup pages
  const hideHeaderNav = pathname === "/" || pathname.startsWith("/auth");

  return (
    <html lang="en" className={montserrat.variable}>
      <body className={`font-montserrat bg-white text-black ${hideHeaderNav ? "" : "pt-[70px]"}`}>
        {!hideHeaderNav && <Header cartCount={3} />}

        <main className="font-sans min-h-screen">{children}</main>

      </body>
    </html>
  );
}
