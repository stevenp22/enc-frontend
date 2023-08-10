import "./globals.css";
import { Inter } from "next/font/google";
import AccountMenu from "@/components/Menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bosstomer",
  description: "aplicacion para encuestas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AccountMenu />
        {children}
      </body>
    </html>
  );
}
