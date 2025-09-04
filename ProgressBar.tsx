import { useEffect, useState } from "react";

export function ProgressBar() {
  const [minted, setMinted] = useState(0);
  const supply = 1200;

  useEffect(() => {
    // TODO: Replace with real contract read
    const stored = typeof window !== "undefined" ? Number(localStorage.getItem("minted") || "0") : 0;
    setMinted(stored);
  }, []);

  const pct = Math.min(100, Math.round((minted / supply) * 100));
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-1 text-sm opacity-80">
        <span>Progress</span>
        <span>{minted} / {supply}</span>
      </div>
      <div className="h-3 w-full rounded-xl bg-zinc-800 overflow-hidden">
        <div className="h-3 bg-white" style={{ width: `${pct}%` }}/>
      </div>
    </div>
  );
}
