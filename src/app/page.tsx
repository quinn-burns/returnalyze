import Sidebar from "@/components/Sidebar";
import OverviewContent from "@/components/overview/OverviewContent";
import FloatingChat from "@/components/FloatingChat";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-neutral-0">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <OverviewContent />
      </main>
      <FloatingChat />
    </div>
  );
}
