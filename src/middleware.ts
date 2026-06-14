import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // จำลองการเช็ก Token (ถ้ายังไม่ได้ล็อกอิน คืนค่าเป็น null หรือ false)
  const isLoggedIn = request.cookies.get("access_token")?.value;

  // เคสที่ 1: ถ้าพิมพ์เข้ามาที่หน้าแรกตรงๆ ( / ) ให้สั่งเด้งไปหน้า /login ทันที
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // เคสที่ 2: ดักสิทธิ์ (ถ้าไม่ได้ล็อกอิน และกำลังจะแอบไปหน้าอื่นที่ไม่ใช่ /login) -> ดีดกลับไป /login
  if (!isLoggedIn && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// ตั้งค่าให้ Middleware ทำงานกับทุกหน้า ยกเว้นไฟล์ระบบและรูปภาพ
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg).*)"],
};
