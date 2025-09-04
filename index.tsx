import { useEffect, useState } from "react";

export default function Admin() {
  const [ok, setOk] = useState(false);
  const [pwd, setPwd] = useState("");

  useEffect(() => {
    const pass = prompt("Admin password:");
    setPwd(pass || "");
  }, []);

  useEffect(() => {
    (async () => {
      if (!pwd) return;
      const res = await fetch("/api/admin/validate", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({ pwd })});
      setOk(res.ok);
    })();
  }, [pwd]);

  if (!pwd) return null;
  if (!ok) return <p className="p-6">Access denied.</p>;

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
      <section className="card mb-6">
        <h2 className="text-lg font-semibold mb-2">Whitelist Manager</h2>
        <p className="opacity-80 text-sm mb-4">Upload or paste wallet addresses to whitelist.</p>
        <WhitelistUploader/>
      </section>
      <section className="card">
        <h2 className="text-lg font-semibold mb-2">Mint Stats</h2>
        <Stats/>
      </section>
    </main>
  );
}

function WhitelistUploader() {
  const [text, setText] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const onSave = async () => {
    setMsg(null);
    const res = await fetch("/api/admin/whitelist", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({ text })});
    const data = await res.json();
    setMsg(res.ok ? "Saved." : data?.error || "Failed");
  };
  return (
    <div>
      <textarea className="w-full h-40 input" placeholder="0xabc..., one per line" value={text} onChange={e=>setText(e.target.value)}/>
      <button className="btn bg-white text-black mt-3" onClick={onSave}>Save</button>
      {msg && <p className="mt-2 opacity-80">{msg}</p>}
    </div>
  );
}

function Stats() {
  const minted = typeof window !== "undefined" ? Number(localStorage.getItem("minted") || "0") : 0;
  return <p className="opacity-80 text-sm">Local demo minted: {minted}</p>;
}
