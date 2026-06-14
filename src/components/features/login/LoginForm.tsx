"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authService } from "@/service/auth";
import { LoginResponse } from "@/service/interface/authInterface";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeOff, Eye, Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const loginSchema = z.object({
  username: z
    .string()
    .min(3, { message: "ชื่อผู้ใช้งานต้องมีอย่างน้อย 3 ตัวอักษร" })
    .max(20, { message: "ชื่อผู้ใช้งานต้องไม่เกิน 20 ตัวอักษร" }),
  password: z
    .string()
    .min(8, { message: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร" })
    .regex(/[A-Z]/, { message: "ต้องมีตัวพิมพ์ใหญ่ (A-Z) อย่างน้อย 1 ตัว" })
    .regex(/[a-z]/, { message: "ต้องมีตัวพิมพ์เล็ก (a-z) อย่างน้อย 1 ตัว" })
    .regex(/[0-9]/, { message: "ต้องมีตัวเลข (0-9) อย่างน้อย 1 ตัว" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "ต้องมีอักขระพิเศษอย่างน้อย 1 ตัว" }),
});

export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      setIsLoading(true);
      console.log("value: ", values);
      const res: LoginResponse = await authService.login(values);

      if (!res || !res.user) {
        console.error("❌ ข้อมูลที่ส่งกลับมาจาก API ไม่ถูกต้องหรือไม่มีข้อมูล User");
        alert("เกิดข้อผิดพลาด: ข้อมูลผู้ใช้งานไม่ถูกต้อง");
        return;
      }

      const userRole = res.user.role?.toLowerCase();

      if (userRole === "system_admin") {
        console.log("🚀 5. ผ่านเงื่อนไขเรียบร้อย! กำลังย้ายหน้าไป /dashboard...");

        // แนะนำให้ใช้ replace แทน push สำหรับเคสล็อกอินเสร็จ จะได้กด Back กลับมาหน้าล็อกอินไม่ได้
        router.replace("/owner/dashboard");
      } else {
        console.warn("⚠️ 5. ล็อกอินผ่าน แต่ Role ไม่ใช่ system_admin (ได้เป็น: " + res.user.role + ")");
        // ถ้าเป็นผู้ใช้ทั่วไป อาจจะให้ไปหน้าอื่น หรือแจ้งเตือน
        alert(`คุณไม่มีสิทธิ์เข้าใช้งานระบบแอดมิน (Role: ${res.user.role})`);
      }
    } catch (error) {
      console.error("❌ เกิดข้อผิดพลาดในการยิง API ล็อกอิน:", error);
      alert("เข้าสู่ระบบไม่สำเร็จ กรุณาเช็กชื่อผู้ใช้งานหรือรหัสผ่านอีกครั้ง");
    } finally {
      setIsLoading(false);
      setShowPassword(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username" // 1. 🎯 เปลี่ยนชื่อฟิลด์เป็น username (หรือชื่ออื่นที่คุณออกแบบไว้ในหลังบ้าน)
          render={({ field }) => (
            <FormItem>
              <FormLabel>ผู้ใช้งาน</FormLabel>
              <FormControl>
                <div className="relative">
                  {/* 2. 🎯 เปลี่ยนเป็นไอคอนรูปคนเพื่อให้ตรงกับคำว่า "ผู้ใช้งาน" */}
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    type="text" // 3. 🎯 เปลี่ยนเป็น text ธรรมดา ไม่ต้องบังคับเป็น email แล้ว
                    placeholder="กรอกชื่อผู้ใช้งาน" // 4. 🎯 เปลี่ยนคำใบ้
                    className="pl-10"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>รหัสผ่าน</FormLabel>
                <a href="#" className="text-xs text-blue-600 hover:underline dark:text-blue-400">
                  ลืมรหัสผ่าน?
                </a>
              </div>
              <FormControl>
                <div className="relative">
                  {/* ไอคอนกุญแจด้านซ้าย */}
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10" // หลบไอคอนซ้ายและปุ่มขวา
                    {...field}
                  />
                  {/* ปุ่มเปิด-ปิดตาสลับ Type */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full mt-2" disabled={isLoading}>
          {isLoading ? "กำลังตรวจสอบข้อมูล..." : "เข้าสู่ระบบ"}
        </Button>
      </form>
    </Form>
  );
}
