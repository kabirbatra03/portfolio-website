import { getCloudflareContext } from "@opennextjs/cloudflare";

const INITIAL_VIEW_COUNT = 0;
const VIEW_COUNTER_KEY = "portfolio:home:views:v4";
const UNIQUE_VISITOR_KEY_PREFIX = "portfolio:home:visitor:v2:";

type ViewsResponse = {
  views: number;
};

type KVLike = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
};

function getMemoryStore() {
  const globalWithCounter = globalThis as typeof globalThis & {
    __portfolioViewCount?: number;
    __portfolioUniqueVisitors?: Set<string>;
  };

  if (typeof globalWithCounter.__portfolioViewCount !== "number") {
    globalWithCounter.__portfolioViewCount = INITIAL_VIEW_COUNT;
  }
  if (!(globalWithCounter.__portfolioUniqueVisitors instanceof Set)) {
    globalWithCounter.__portfolioUniqueVisitors = new Set<string>();
  }

  return globalWithCounter;
}

async function getViewsStore(): Promise<KVLike | null> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const viewsBinding = (env as Record<string, unknown>).VIEWS;

    if (viewsBinding && typeof viewsBinding === "object" && "get" in viewsBinding && "put" in viewsBinding) {
      return viewsBinding as KVLike;
    }
  } catch {
    // Local Next.js dev can run without Cloudflare bindings.
  }

  return null;
}

function jsonResponse(payload: ViewsResponse, extraHeaders?: HeadersInit) {
  const headers = new Headers({
    "Cache-Control": "no-store, max-age=0",
  });

  if (extraHeaders) {
    for (const [key, value] of new Headers(extraHeaders).entries()) {
      headers.set(key, value);
    }
  }

  return Response.json(payload, { headers });
}

function parseCount(rawValue: string | null): number {
  const parsed = Number.parseInt(rawValue ?? `${INITIAL_VIEW_COUNT}`, 10);
  return Number.isFinite(parsed) ? parsed : INITIAL_VIEW_COUNT;
}

async function getCurrentViews(store: KVLike | null): Promise<number> {
  if (!store) {
    const memory = getMemoryStore();
    return memory.__portfolioViewCount ?? INITIAL_VIEW_COUNT;
  }

  const currentValue = await store.get(VIEW_COUNTER_KEY);
  return parseCount(currentValue);
}

function getCookieVisitorId(request: Request): string | null {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(";").map((entry) => entry.trim());
  const visitorEntry = cookies.find((entry) => entry.startsWith("pv_id="));
  if (!visitorEntry) return null;

  const value = visitorEntry.slice("pv_id=".length);
  if (!value) return null;
  if (!/^[a-zA-Z0-9:_-]{8,128}$/.test(value)) return null;

  return value;
}

function createVisitorId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `v_${crypto.randomUUID().replace(/-/g, "")}`;
  }

  return `v_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
}

export async function GET() {
  const store = await getViewsStore();
  const views = await getCurrentViews(store);
  return jsonResponse({ views });
}

export async function POST(request: Request) {
  const store = await getViewsStore();
  let visitorId = getCookieVisitorId(request);
  let setCookieHeader: string | undefined;

  if (!visitorId) {
    visitorId = createVisitorId();
    setCookieHeader = `pv_id=${visitorId}; Path=/; Max-Age=31536000; SameSite=Lax; Secure`;
  }

  if (!store) {
    const memory = getMemoryStore();
    const seen = memory.__portfolioUniqueVisitors ?? new Set<string>();
    if (!seen.has(visitorId)) {
      seen.add(visitorId);
      memory.__portfolioUniqueVisitors = seen;
      memory.__portfolioViewCount = (memory.__portfolioViewCount ?? INITIAL_VIEW_COUNT) + 1;
    }
    return jsonResponse(
      { views: memory.__portfolioViewCount ?? INITIAL_VIEW_COUNT },
      setCookieHeader ? { "Set-Cookie": setCookieHeader } : undefined,
    );
  }

  const visitorKey = `${UNIQUE_VISITOR_KEY_PREFIX}${visitorId}`;
  const alreadyCounted = await store.get(visitorKey);

  if (alreadyCounted) {
    const views = await getCurrentViews(store);
    return jsonResponse({ views }, setCookieHeader ? { "Set-Cookie": setCookieHeader } : undefined);
  }

  await store.put(visitorKey, "1");
  const currentViews = await getCurrentViews(store);
  const nextViews = currentViews + 1;
  await store.put(VIEW_COUNTER_KEY, `${nextViews}`);

  return jsonResponse({ views: nextViews }, setCookieHeader ? { "Set-Cookie": setCookieHeader } : undefined);
}
