import { useEffect, useState } from "react";
import { useAddress } from "@thirdweb-dev/react";

const MAX_PER_WALLET = 3;

export function MintControls() {
  const address = useAddress();
  const [qty, setQty] = useState(1);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const plus = () => setQty(q => Math.min(MAX_PER_WALLET, q + 1));
  const minus = () => setQty(q => Math.max(1, q - 1));

  const onMint = async () => {
    setBusy(true); setMessage(null);
    try {
      const token = (window as any).grecaptcha ? await (window as any).grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, {action: 'mint'}) : "";
      const res = await fetch("/api/mint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qty, token })
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || "Mint failed");
      setMessage("Mint initiated! Confirm in your wallet.");
      // Demo: bump local progress
      const minted = Number(localStorage.getItem("minted") || "0") + qty;
      localStorage.setItem("minted", String(minted));
    } catch (e:any) {
      setMessage(e.message || "Mint failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mt-6 flex items-center gap-3">
      <button className="btn bg-zinc-800" onClick={minus} disabled={busy || qty<=1}>-</button>
      <div className="w-20 text-center text-lg">{qty}</div>
      <button className="btn bg-zinc-800" onClick={plus} disabled={busy || qty>=MAX_PER_WALLET}>+</button>
      <button className="btn bg-white text-black" onClick={onMint} disabled={busy || !address}>
        {busy ? "Processing..." : "Mint"}
      </button>
      {message && <p className="ml-3 opacity-80">{message}</p>}
    </div>
  );
}
