import { getCloudflareContext } from "@opennextjs/cloudflare";

const INITIAL_VIEW_COUNT = 0;
const VIEW_COUNTER_KEY = "portfolio:home:views:v3";

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
  };

  if (typeof globalWithCounter.__portfolioViewCount !== "number") {
    globalWithCounter.__portfolioViewCount = INITIAL_VIEW_COUNT;
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

function jsonResponse(payload: ViewsResponse) {
  return Response.json(payload, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
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

export async function GET() {
  const store = await getViewsStore();
  const views = await getCurrentViews(store);
  return jsonResponse({ views });
}

export async function POST() {
  const store = await getViewsStore();

  if (!store) {
    const memory = getMemoryStore();
    memory.__portfolioViewCount = (memory.__portfolioViewCount ?? INITIAL_VIEW_COUNT) + 1;
    return jsonResponse({ views: memory.__portfolioViewCount ?? INITIAL_VIEW_COUNT });
  }

  const currentViews = await getCurrentViews(store);
  const nextViews = currentViews + 1;
  await store.put(VIEW_COUNTER_KEY, `${nextViews}`);

  return jsonResponse({ views: nextViews });
}
