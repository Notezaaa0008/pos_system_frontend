"use client";

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
import { Link, User, Key, Settings, LogOut } from "lucide-react";

export default function LayoutSystemNavbarComponent() {
  const handleLogout = () => {};
  return (
    <header className="h-16 border-b bg-white dark:bg-slate-900 px-6 flex items-center justify-between">
      <div className="text-sm font-medium text-slate-500">ระบบจัดการหลังบ้านใช้งานร่วมกัน</div>
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">สมชาย ขยันยิ่ง</p>
          <p className="text-xs text-slate-400 capitalize">Owner</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 select-none outline-none">
              <Avatar className="h-10 w-10 border border-slate-200 dark:border-slate-800">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Profile"
                />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">สมชาย ขยันยิ่ง</p>
                <p className="text-xs leading-none text-slate-400">somchai@email.com</p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {/* ปุ่มแก้ไขโปรไฟล์ */}
            <DropdownMenuItem asChild>
              <Link href="/settings/profile" className="cursor-pointer flex items-center w-full">
                <User className="mr-2 h-4 w-4" />
                <span>แก้ไขโปรไฟล์</span>
              </Link>
            </DropdownMenuItem>

            {/* ปุ่มเปลี่ยนรหัสผ่าน */}
            <DropdownMenuItem asChild>
              <Link href="/settings/change-password" className="cursor-pointer flex items-center w-full">
                <Key className="mr-2 h-4 w-4" />
                <span>เปลี่ยนรหัสผ่าน</span>
              </Link>
            </DropdownMenuItem>

            {/* ปุ่มไปหน้าตั้งค่าอื่นๆ (ถ้ามี) */}
            <DropdownMenuItem asChild>
              <Link href="/settings" className="cursor-pointer flex items-center w-full">
                <Settings className="mr-2 h-4 w-4" />
                <span>ตั้งค่าระบบ</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* ปุ่ม Logout */}
            <DropdownMenuItem
              className="text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-950/50 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>ออกจากระบบ</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
