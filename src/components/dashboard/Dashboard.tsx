import Hero from "../Hero";
import StatsGrid from "../StatsGrid";
import FaucetCard from "../faucet/FaucetCard";
import TransactionHistory from "../history/TransactionHistory";
import { WrongNetworkBanner } from "../WrongNetworkBanner";

function Dashboard() {
  return (
    <section className="space-y-10">
      <Hero />

      <WrongNetworkBanner />

      <StatsGrid />

      <div className="grid gap-6 md:grid-cols-2">
        <FaucetCard />
        <TransactionHistory />
      </div>
    </section>
  );
}

export default Dashboard;