import { PropsWithChildren, useEffect, useState } from "react";
import { useAddress } from "@thirdweb-dev/react";

export function WhitelistGate({ children }: PropsWithChildren) {
  const address = useAddress();
  const [allowed, setAllowed] = useState(false);
  const whitelistOnly = (process.env.NEXT_PUBLIC_WHITELIST_ONLY || "true") === "true";

  useEffect(() => {
    if (!whitelistOnly) { setAllowed(true); return; }
    if (!address) { setAllowed(false); return; }
    (async () => {
      try {
        const res = await fetch(`/api/whitelist-check?address=${address}`);
        const data = await res.json();
        setAllowed(Boolean(data?.ok));
      } catch {
        setAllowed(false);
      }
    })();
  }, [address, whitelistOnly]);

  if (!address) return <p className="opacity-80">Connect wallet to continue.</p>;
  if (!allowed) return <p className="opacity-80">Your wallet is not whitelisted.</p>;
  return <>{children}</>;
}
