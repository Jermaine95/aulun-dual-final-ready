import type { NextApiRequest, NextApiResponse } from "next";
import { verifyRecaptcha } from "@/server/recaptcha";
import { isWhitelisted } from "@/server/whitelist";
import { rateLimit } from "@/server/rateLimiter";

const limiter = rateLimit({ intervalMs: 60000, uniqueTokenPerInterval: 500, allowedPerInterval: 10 });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") return res.status(405).json({ ok: false, error: "method not allowed" });
    await limiter.check(res, 10, "mint"); // 10 per minute

    const { qty = 1, token = "", address = "" } = req.body || {};
    if (process.env.NEXT_PUBLIC_WHITELIST_ONLY === "true" && !(await isWhitelisted(address))) {
      return res.status(403).json({ ok: false, error: "not whitelisted" });
    }

    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && !(await verifyRecaptcha(token))) {
      return res.status(400).json({ ok: false, error: "recaptcha failed" });
    }

    // TODO: wire up thirdweb SDK mint call using NEXT_PUBLIC_NFT_DROP_ADDRESS when available
    return res.status(200).json({ ok: true });
  } catch (e:any) {
    return res.status(429).json({ ok: false, error: e.message });
  }
}
