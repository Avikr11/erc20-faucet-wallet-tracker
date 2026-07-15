import type { ReactNode } from "react";
import Navbar from "../navbar/Navbar";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="pt-20">
        {children}
      </main>
    </div>
  );
}

export default Layout;