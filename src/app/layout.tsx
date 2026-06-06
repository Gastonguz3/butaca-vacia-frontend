import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar/Navbar";

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
      className={`${poppins.className}  h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-linear-to-br from-red-950 via-red-900 to-black text-white">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
