"use client";
import { Image, Title } from "@mantine/core";
import NextImage from "next/image";

import ConnectXLogo from "@images/logo/logo.png";
import { Icons } from "@/components/icons";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative mx-auto max-w-xl h-screen">
      <div
        className="h-full bg-opacity-80 bg-white"
        style={{
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="flex flex-col gap-2 items-center pt-20">
          <Image
            component={NextImage}
            src={ConnectXLogo}
            alt="Connect X Logo"
            w={60}
            h={60}
            style={{ margin: "0 auto" }}
            priority
          />
          <Title order={1} c="primary.10" fz={30}>
            ConnectX
          </Title>
        </div>
        <div className="">{children}</div>
      </div>
      <Icons.shapeBackground1 className="absolute top-2 right-0 -z-10 h-48" />
      <Icons.shapeBackground2 className="absolute top-24 left-0 -z-10 h-48" />
      <Icons.shapeBackground1 className="absolute bottom-36 left-0 -z-10 h-96" />
      <Icons.shapeBackground2 className="absolute bottom-12 right-0 -z-10 h-64" />
    </div>
  );
}
