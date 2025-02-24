import { SERVER_URL } from "@/utils/loadEnv";
import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  // baseURL: "http://localhost:5001",
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const setHead = (token: string) => {
  console.log("setting head", token);

  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const verifyToken = () =>
  api.get("/auth/tokens", {
    withCredentials: true,
  });

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

let refresh = false;
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    try {
      if (["401", "403"].includes(error.code || "") && !refresh) {
        console.log("interceptor refreshing token");
        refresh = true;
        const response = await verifyToken();
        console.log("axios", response);
        if (response.status === 200) {
          console.log(response.data.data);
          setHead(response.data.data);
          if (error.config) return api(error.config);
        }
      }
      refresh = false;
      return error;
    } catch (err) {
      console.log(err);
    }

    return Promise.reject(error);
  }
);

export const apiUserData = () =>
  api.get("/users/me", { withCredentials: true });

export const logout = () =>
  api.post("/users/auth/signout", {}, { withCredentials: true });

export const createMockApi = async (data: any) => {
  console.log(data);

  const res = await api.post("/mockets", data);
  return res.data;
};

export const createMockAiApi = async (data: any) => {
  console.log(data);

  const res = await api.post("/mockets/ai", data);
  return res.data;
};

export const getMockApi = async () => {
  const res = await api.get("/mockets");
  return res.data;
};

export const getMockEndpoint = async (id: string) => {
  const res = await api.get(`/mockets/${id}`);
  return res.data;
}


export default api;
