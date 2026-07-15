export const projectId =
  import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

if (!projectId) {
  throw new Error(
    "WalletConnect Project ID is missing."
  );
}