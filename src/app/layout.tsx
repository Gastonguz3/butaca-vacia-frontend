import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar/Navbar";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Butaca Vacia App",
  description: "App que recomienda peliculas y series basadas en los gustos del usuario",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.className}  h-full antialiased `}
    >
      <body className="min-h-full flex flex-col text-white">
        <Navbar />
        {children}

        <Toaster/>
      </body>
    </html>
  );
}
