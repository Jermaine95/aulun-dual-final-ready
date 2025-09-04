import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { ThirdwebProvider } from "@thirdweb-dev/react";

export default function App({ Component, pageProps }: AppProps) {
  // Chain name configurable via env
  const chain = process.env.NEXT_PUBLIC_CHAIN || "polygon";
  return (
    <ThirdwebProvider activeChain={chain}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
