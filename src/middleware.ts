import { NextRequest, NextResponse } from "next/server";
import { ROUTER } from "./constant";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  const id = url.pathname.slice(3); // remove /e/ from the url

  try {
    const eventResponse = await fetch(
      `https://connectx.twendeesoft.com/event/${id}`
    );

    if (eventResponse.status === 200) {
      console.warn(`Event with ID "${id}" not found.`);
      const redirectUrl = new URL(`${url.origin}${ROUTER.EVENT}/${id}`);
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next();
  } catch (error) {
    console.error(`Error fetching event:`, error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: "/e/:id*",
};
