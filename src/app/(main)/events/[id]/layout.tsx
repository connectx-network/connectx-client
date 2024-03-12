import { EventDetail } from "@/types/event";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;
  const BASE_API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const url = `https://connectx.network/events/${id}`;
  // fetch data
  const event: EventDetail = await fetch(`${BASE_API_URL}/event/${id}`).then(
    (res) => res.json()
  );

  return {
    title: event.name,
    openGraph: {
      title: event.name,
      type: "website",
      description: event.description,
      images: [
        {
          url: event?.eventAssets?.[0].url, // Must be an absolute URL
          width: 800,
          height: 600,
        },
      ],
      url,
    },
  };
}

export default function EventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
