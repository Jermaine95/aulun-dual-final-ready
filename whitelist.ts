import fs from "fs";
import path from "path";

const storePath = path.join(process.cwd(), "server", "data", "whitelist.json");

function ensureStore() {
  const dir = path.dirname(storePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(storePath)) fs.writeFileSync(storePath, JSON.stringify({ addresses: [] }, null, 2));
}

export async function isWhitelisted(addr: string): Promise<boolean> {
  ensureStore();
  const json = JSON.parse(fs.readFileSync(storePath, "utf-8"));
  const addresses: string[] = json.addresses || [];
  return addresses.map(a => a.toLowerCase()).includes(String(addr || "").toLowerCase());
}

export async function saveWhitelistText(text: string) {
  ensureStore();
  const raw = text.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
  const unique = Array.from(new Set(raw.map(s => s.toLowerCase())));
  fs.writeFileSync(storePath, JSON.stringify({ addresses: unique }, null, 2));
}
