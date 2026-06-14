import axiosInstance from "@/utils/axios";
import { LoginPayload, LoginResponse, LogoutResponse } from "./interface/authInterface";

export const authService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await axiosInstance.post("auth/login", { ...payload, client: "web" });

    const resdata: LoginResponse = response.data;
    // สำหรับตรวจสอบว่า ถ้าทำงานอยู่ที่ server ให้ข้ามไปเพราะไม่มี sesion จะแค่ปั้น HTML ส่งออกให้ เครื่องผู้ใช้งาน ไม่งั้น error
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "user_session",
        JSON.stringify({
          userId: resdata.user.user_id,
          role: resdata.user.role,
          displayName: resdata.user.display_name,
          image: resdata.user.image,
        }),
      );
    }

    return response.data;
  },

  logout: async (isLogOutAllDevices: boolean): Promise<LogoutResponse> => {
    const response = await axiosInstance.post(
      `auth/logout?all=${isLogOutAllDevices}`,
      {}, // body ว่างๆ
      {
        withCredentials: true, // 👈 มั่นใจว่าเบราว์เซอร์จะหยิบคุกกี้แนบไปด้วยแน่นอน
      },
    );

    return response.data;
  },
};
