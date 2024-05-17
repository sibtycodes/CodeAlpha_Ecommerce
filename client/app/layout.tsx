import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ToastContainer } from 'react-toastify';
// import ImageIco from "@/public/org.ico"

const inter = Inter({ subsets: ["latin"] });
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: " ~ Syed Sibtain Ali Shah",
  description: "Buy timeless t shirts",
  // icons: {
  //   icon: [
  //     {
  //       rel: "icon",


  //       type: "image/png",
  //       url: ImageIco.src,
  //     },

  //   ],
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer position="top-right" style={{ zIndex: 99999 }} />
        <Navbar />

        {children}

      </body>
    </html>
  );
}
