import { ConnectButton } from "@rainbow-me/rainbowkit";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm font-bold text-accent-foreground">
            E
          </span>

          <h1 className="text-lg font-semibold tracking-tight">
            ERC20 Faucet
          </h1>
        </div>

        <ConnectButton />
        
      </div>
    </header>
  );
}

export default Navbar;