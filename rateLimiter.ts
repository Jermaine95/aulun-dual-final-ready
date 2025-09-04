import type { NextApiResponse } from "next";

// Simple in-memory token bucket limiter
export function rateLimit({ intervalMs, uniqueTokenPerInterval, allowedPerInterval }:{intervalMs:number, uniqueTokenPerInterval:number, allowedPerInterval:number}) {
  const tokens = new Map<string, { count: number, ts: number }>();
  return {
    check: async (res: NextApiResponse, limit: number, tokenKey: string) => {
      const now = Date.now();
      const t = tokens.get(tokenKey) || { count: 0, ts: now };
      if (now - t.ts > intervalMs) { t.count = 0; t.ts = now; }
      t.count += 1; tokens.set(tokenKey, t);
      if (t.count > allowedPerInterval) {
        res.status(429);
        throw new Error("Too many requests");
      }
    }
  };
}
