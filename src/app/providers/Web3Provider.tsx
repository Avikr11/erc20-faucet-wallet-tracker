import type { ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { QueryProvider } from "./QueryProvider";
import { wagmiConfig } from "@/config/wagmi";

import "@rainbow-me/rainbowkit/styles.css";

interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryProvider>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryProvider>
    </WagmiProvider>
  );
}