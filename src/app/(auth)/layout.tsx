"use client";
import { Image, Title, useComputedColorScheme } from "@mantine/core";
import NextImage from "next/image";
import cx from "clsx";
import ConnectXLogo from "@images/logo/logo.png";
import { Icons } from "@/components/icons";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const computedColor = useComputedColorScheme();
  const isDarkMode = computedColor === "dark";
  return (
    <div className="relative mx-auto max-w-xl h-screen">
      <div
        className={cx([
          "h-screen bg-opacity-80",
          isDarkMode ? "bg-[#1F1212]" : "bg-white",
        ])}
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
          <Title order={1} fz={30}>
            Connect X
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
