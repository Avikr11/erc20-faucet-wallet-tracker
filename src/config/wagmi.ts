import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { supportedChains } from "./chains";
import { projectId } from "./rainbowkit";

export const wagmiConfig = getDefaultConfig({
  appName: "ERC20 Faucet Wallet Tracker",
  projectId,
  chains: supportedChains,
  ssr: false,
});