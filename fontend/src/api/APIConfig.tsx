import axios from "axios";

// Kiểm tra môi trường để đặt baseURL phù hợp
export const API_URL =
    import.meta.env.MODE === 'production'
        ? 'https://namphatmanager.candctp.com/api'
        : 'http://localhost:8085/api';


// export  const API_URL = 'https://localhost:8085';
const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-type": "application/json",
    },
});

// Xử lý thêm Authorization header cho các yêu cầu không phải login
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token && config.url !== "/authen/login" && config.url !== "/authen/refresh") {
            console.log("Token added to request headers.");
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Xử lý lỗi response (cho những yêu cầu có token hết hạn hoặc lỗi)
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        // Nếu lỗi là do token hết hạn (401), bạn có thể xử lý tại đây
        if (error.response && error.response.status === 401) {
            console.log("Token expired or unauthorized access. Trying to refresh...");

            const refreshToken = localStorage.getItem("refresh_token");

            if (refreshToken) {
                try {
                    // Gửi yêu cầu làm mới token
                    const response = await axios.post(`${API_URL}/authen/refresh`, { refresh_token: refreshToken });

                    const newToken = response.data.token;
                    const newRefreshToken = response.data.refresh_token;

                    // Lưu lại token mới và refresh token mới
                    localStorage.setItem("token", newToken);
                    localStorage.setItem("refresh_token", newRefreshToken);

                    // Thử lại yêu cầu gốc với token mới
                    error.config.headers["Authorization"] = `Bearer ${newToken}`;
                    return axios(error.config);
                } catch (refreshError) {
                    console.error("Refresh token failed, redirecting to login...");
                    // Chuyển hướng đến trang đăng nhập nếu làm mới token thất bại
                    // window.location.href = "/login";
                    return Promise.reject(refreshError);
                }
            }
        }

        return Promise.reject(error);
    }
);

export default api;
