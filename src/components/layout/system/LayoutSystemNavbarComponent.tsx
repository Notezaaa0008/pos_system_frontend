"use client";

import Link from "next/link";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Key, Settings, LogOut, ShieldAlert } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { authService } from "@/service/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserSessionData {
  userId: string;
  role: string;
  displayName: string;
  image: string;
}

export default function LayoutSystemNavbarComponent() {
  const router = useRouter();
  const [user, setUser] = useState<UserSessionData | null>(null);

  useEffect(() => {
    const userSession = sessionStorage.getItem("user_session");
    console.log(userSession);

    if (userSession) {
      try {
        const userData: UserSessionData = JSON.parse(userSession);
        setUser(userData);
      } catch (error) {
        console.error("Failed to parse user_session:", error);
      }
    }
  }, []);

  const handleLogout = async (isLogOutAllDevices: boolean) => {
    try {
      await authService.logout(isLogOutAllDevices);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      sessionStorage.clear();
      router.push("/login");
      router.refresh();
    }
  };
  return (
    <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
      <div className="pos-body font-medium">ระบบจัดการหลังบ้านใช้งานร่วมกัน</div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 select-none">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-foreground">{user?.displayName}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
          </div>

          <Avatar className="h-10 w-10 border border-border">
            <AvatarImage
              src={
                user?.image
                  ? user.image
                  : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
              }
              alt="Profile"
            />
            <AvatarFallback className="bg-muted text-muted-foreground">SC</AvatarFallback>
          </Avatar>
        </div>

        {/* เส้นแบ่งโซน */}
        <div className="h-6 w-px bg-border hidden sm:block" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-xl border border-border hover:bg-accent text-muted-foreground hover:text-accent-foreground outline-none transition-colors"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-60 bg-popover text-popover-foreground border-border" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-foreground">เมนูการตั้งค่าบัญชี</p>
                <p className="text-xs leading-none text-muted-foreground">somchai@email.com</p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="bg-border" />

            <DropdownMenuItem asChild>
              <Link href="/settings/profile" className="cursor-pointer flex items-center w-full text-sm">
                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>แก้ไขโปรไฟล์</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/settings/change-password" className="cursor-pointer flex items-center w-full text-sm">
                <Key className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>เปลี่ยนรหัสผ่าน</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-border" />

            <DropdownMenuItem
              className="text-muted-foreground focus:bg-accent cursor-pointer flex items-center w-full text-sm"
              onClick={() => handleLogout(false)}
            >
              <LogOut className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>ออกจากระบบ (เครื่องนี้)</span>
            </DropdownMenuItem>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()} // บังคับไม่ให้ Dropdown ปิดก่อนที่ Modal จะเด้งขึ้นมา
                  className="text-[var(--danger)] focus:bg-destructive/10 focus:text-[var(--danger)] cursor-pointer flex items-center w-full text-sm"
                >
                  <ShieldAlert className="mr-2 h-4 w-4" />
                  <span>ดีดออกจากทุกเครื่อง</span>
                </DropdownMenuItem>
              </AlertDialogTrigger>

              {/* หน้าต่างยืนยันความปลอดภัย */}
              <AlertDialogContent className="bg-popover border-border max-w-md">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-foreground">คุณต้องการดีดออกจากทุกเครื่องใช่ไหม?</AlertDialogTitle>
                  <AlertDialogDescription className="text-muted-foreground text-sm">
                    การทำรายการนี้จะยกเลิกการเชื่อมต่อของบัญชีนี้ในทุกอุปกรณ์ทันที
                    พนักงานคนอื่นที่กำลังใช้งานบัญชีนี้อยู่จะต้องทำการเข้าสู่ระบบใหม่อีกครั้ง
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  {/* นำคลาสปุ่มที่คุณดีไซน์ไว้มาสวมใช้งานได้เลย */}
                  <AlertDialogCancel className="btn-pos-secondary h-auto py-2 rounded-lg">ยกเลิก</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleLogout(true)}
                    className="btn-pos-danger h-auto py-2 rounded-lg"
                  >
                    ใช่, ดีดออกทั้งหมด
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
