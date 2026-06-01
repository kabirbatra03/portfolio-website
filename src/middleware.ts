import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest, event: NextFetchEvent) {
  const isHomePageRequest = request.nextUrl.pathname === "/";
  const isGetRequest = request.method === "GET";

  if (isHomePageRequest && isGetRequest) {
    const countUrl = new URL("/api/views", request.url);

    event.waitUntil(
      fetch(countUrl, {
        method: "POST",
        headers: {
          "x-counter-source": "middleware",
        },
        cache: "no-store",
      }).catch(() => {
        // Ignore counter errors so page delivery is never blocked.
      }),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
