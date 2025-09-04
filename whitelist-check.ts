import type { NextApiRequest, NextApiResponse } from "next";
import { isWhitelisted } from "@/server/whitelist";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { address } = req.query;
    if (!address || typeof address !== "string") return res.status(400).json({ ok: false, error: "address required" });
    const ok = await isWhitelisted(address);
    return res.status(200).json({ ok });
  } catch (e:any) {
    return res.status(500).json({ ok: false, error: e.message });
  }
}
