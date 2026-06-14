import { Coins, LayoutDashboard, Link, Package, UserCheck, Users } from "lucide-react";

export default function LayoutSystemSidebarComponent() {
  const sidebarItems = [
    { name: "Dashboard", href: "/owner/dashboard", icon: LayoutDashboard },
    { name: "Cashier (คิดเงิน)", href: "/cashier", icon: Coins },
    { name: "Inventory (สต็อก)", href: "/inventory", icon: Package },
    { name: "Manager (จัดการ)", href: "/manager", icon: UserCheck },
    { name: "Staff (พนักงาน)", href: "/staff", icon: Users },
  ];

  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col justify-between hidden md:flex">
      <div className="p-6">
        {/* หัวข้อโลโก้ระบบ POS ใช้สีส้มแอ็กชันดึงสายตา */}
        <div className="flex items-center gap-2 font-bold text-xl tracking-wide mb-8 text-[var(--action-orange)]">
          <Coins className="h-6 w-6" />
          <span>POS SYSTEM</span>
        </div>

        <nav className="space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ส่วนท้ายของ Sidebar อิงสีข้อความจางด้วย muted-foreground */}
      <div className="p-4 border-t border-border text-xs text-muted-foreground text-center">
        v1.0.0 © 2026 POS System
      </div>
    </aside>
  );
}
