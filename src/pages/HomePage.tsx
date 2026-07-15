import Dashboard from "../components/dashboard/Dashboard";

function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="max-w-7xl mx-auto p-6">
        <Dashboard />
      </section>
    </main>
  );
}

export default HomePage;