import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  timeout: 10000, // ถ้าหลังบ้านไม่ตอบกลับใน 10 วินาที ให้ตัดการทำงาน
  headers: {
    "Content-Type": "application/json",
  },

  // ⚡ สำคัญมาก: เพื่อให้ Axios แนบและรับ Cookie (Access/Refresh Token) ทุกครั้ง
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // ถ้ารันบน Browser (Client Component) ให้ดีดกลับไปหน้า login
      if (typeof window !== "undefined") {
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
