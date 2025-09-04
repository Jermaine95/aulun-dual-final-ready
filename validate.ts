import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { pwd } = req.body || {};
  if (!pwd || pwd !== process.env.NEXT_PUBLIC_ADMIN_PASS) return res.status(401).json({ ok: false });
  return res.status(200).json({ ok: true });
}
