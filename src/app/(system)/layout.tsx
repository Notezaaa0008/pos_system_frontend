import LayoutSystemNavbarComponent from "@/components/layout/system/LayoutSystemNavbarComponent";
import LayoutSystemSidebarComponent from "@/components/layout/system/LayoutSystemSidebarComponent";

export default function SystemLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <LayoutSystemSidebarComponent />
      <div className="flex flex-col flex-1 overflow-hidden">
        <LayoutSystemNavbarComponent />

        {/* ================= MAIN CONTENT ================= */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50 dark:bg-slate-950">{children}</main>
      </div>
    </div>
  );
}
