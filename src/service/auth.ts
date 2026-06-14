import axiosInstance from "@/utils/axios";

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  status: string;
  user: {
    user_id: string;
    role: string;
    display_name: string;
    image?: string;
  };
}

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
};
