function Hero() {
  return (
    <section className="space-y-4">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent ring-1 ring-accent/20">
        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
        Live on Sepolia Testnet
      </span>

      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        ERC-20 Faucet & Wallet Tracker
      </h2>

      <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
        Claim demo ERC-20 tokens, monitor wallet balances,
        and track transactions in a modern Web3 dashboard.
      </p>
    </section>
  );
}

export default Hero;