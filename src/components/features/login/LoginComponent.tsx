import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import LoginForm from "./LoginForm";

export default function LoginComponent() {
  return (
    <Card className="w-full max-w-md shadow-lg border-slate-200 dark:border-slate-800">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">เข้าสู่ระบบ</CardTitle>
        <CardDescription>กรอกผู้ใช้งานและรหัสผ่านของคุณเพื่อเข้าใช้งานระบบ</CardDescription>
      </CardHeader>

      <CardContent>
        <LoginForm />
      </CardContent>

      <CardFooter className="flex flex-wrap justify-center gap-1 text-sm text-slate-500 dark:text-slate-400">
        <span>ยังไม่มีบัญชีผู้ใช้?</span>
        <a href="#" className="text-blue-600 font-medium hover:underline dark:text-blue-400">
          สมัครสมาชิกใหม่
        </a>
      </CardFooter>
    </Card>
  );
}
