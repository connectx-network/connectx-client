import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/spotlight/styles.css";
import "@mantine/carousel/styles.css";
import Providers from "@/utils/provider";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ConnectX",
  description: "ConnectX",
  itunes: {
    appId: "6478659561",
    appArgument: "https://apps.apple.com/app/connectx-network/id6478659561",
  },
  appleWebApp: {
    title: "ConnectX Network",
  },
  openGraph: {
    title: "ConnectX",
    type: "website",
    description: "ConnectX",
    images: [
      {
        url: "https://storage.googleapis.com/connectx-322be.appspot.com/APP_LOGO%2Fconnectx_logo.png", // Must be an absolute URL
        width: 800,
        height: 600,
      },
    ],
    url: "https://connectx.network",
  },
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
