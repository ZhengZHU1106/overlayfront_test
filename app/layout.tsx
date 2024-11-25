import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import "./globals.css";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Overlay",
  description: "Making software understand you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex flex-col h-[100dvh] w-full bg-gray-100 py-10 px-5 md:px-10 lg:px-[450px]">
          <div className="flex-1 p-1 w-full overflow-hidden bg-gradient-to-br from-[#EF953F] to-[#567CDD] rounded-[28px] shadow-md shadow-gray-200">
            {children}
          </div>
          
        </main>
      </body>
    </html>
  );
}
