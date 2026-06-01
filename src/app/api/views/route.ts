import { getCloudflareContext } from "@opennextjs/cloudflare";
import { profile } from "@/lib/data";

const VIEW_COUNTER_KEY = "portfolio:home:views";

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
    globalWithCounter.__portfolioViewCount = profile.views;
  }

  return globalWithCounter;
}

async function getViewsStore(): Promise<KVLike | null> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const viewsBinding = (env as Record<string, unknown>).VIEWS;

    if (
      viewsBinding &&
      typeof viewsBinding === "object" &&
      "get" in viewsBinding &&
      "put" in viewsBinding
    ) {
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

export async function GET() {
  const store = await getViewsStore();

  if (!store) {
    const memory = getMemoryStore();
    return jsonResponse({ views: memory.__portfolioViewCount ?? profile.views });
  }

  const currentValue = await store.get(VIEW_COUNTER_KEY);
  const views = Number.parseInt(currentValue ?? `${profile.views}`, 10);

  return jsonResponse({ views: Number.isFinite(views) ? views : profile.views });
}

export async function POST() {
  const store = await getViewsStore();

  if (!store) {
    const memory = getMemoryStore();
    memory.__portfolioViewCount = (memory.__portfolioViewCount ?? profile.views) + 1;
    return jsonResponse({ views: memory.__portfolioViewCount });
  }

  const currentValue = await store.get(VIEW_COUNTER_KEY);
  const currentViews = Number.parseInt(currentValue ?? `${profile.views}`, 10);
  const safeCurrentViews = Number.isFinite(currentViews) ? currentViews : profile.views;
  const nextViews = safeCurrentViews + 1;

  await store.put(VIEW_COUNTER_KEY, `${nextViews}`);

  return jsonResponse({ views: nextViews });
}
