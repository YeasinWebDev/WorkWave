'use client'
import { Roboto } from "next/font/google";
import Lenis from '@studio-freight/lenis';
import "../globals.css";
import { useEffect } from "react";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

// export const metadata = {
//   title: "WorkWave",
//   description: "Upgrade your HR and Payroll systems today",
// };

export default function RootLayout({ children }) {

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy(); 
    };
  }, []);

  
  return (
    <html lang="en" data-theme='light'>
      <head>
        <link
          rel="icon"
          href="https://res.cloudinary.com/dlrktntvb/image/upload/v1726371825/logo_1_vfipke.ico"
          sizes="any"
        />
         
      </head>
      <body className={`${roboto.variable} antialiased`}>{children}</body>
    </html>
  );
}
