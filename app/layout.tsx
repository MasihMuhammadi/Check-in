import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from '../redux/Provider';
import Header from "./components/header";
import ClientWrapper from "./components/clientWrapper"; // Adjust the path as necessary
import MainPage from "./components/mainPage";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Check In Now",
  description: "Automated Attendance management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden h-screen">
      <body className={inter.className}>
        <Providers>
          <ClientWrapper>
            <div>
              <Header />
              {children}
            </div>
          </ClientWrapper>
        </Providers>
      </body>
    </html>
  );
}
