import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import Providers from "@/utils/provider";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ConnectX",
  description: "ConnectX",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={lexend.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
