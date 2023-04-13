import axios from "axios"; // npm install axios
import router from "@/router/index.js";
// import { hasToken, getToken, clearToken } from "@/utils/auth.js";
// import { message } from "ant-design-vue";
// import { refreshToken } from "@/api/allApi.js";

let axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.VUE_APP_BASE_URL
      : process.env.VUE_APP_REQUEST_URL,
  timeout: 60000,
  headers: { "Content-Type": "application/json;charset=utf-8" }, // 默认 json 格式,如果是文件上传或者其他，可以修改 headers: { 'Content-Type': 'multipart/form-data' }
});

axiosInstance.interceptors.request.use(
  async (config) => {
    // 接口本身不需要 token 验证
    // if (config.noNeedToken) return config;

    // if (hasToken()) {
    //   config.headers.accessToken = getToken();
    //   return config;
    // }

    // if (!hasToken()) {
    //   const accessToken = await refreshToken();
    //   config.headers.accessToken = accessToken;
    //   return config;
    // }
    return config;
  },
  (error) => {
    console.error(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data.code === 200) {
      return response.data;
    }
  },
  (error) => {
    // 登录过期，请重新登录
    if (error.response.code === 301) {
      // clearToken();
      // message.error("登录过期，请重新登录");

      router.push({
        path: "/login",
        query: {
          redirect: router.currentRoute.fullPath,
        },
      });
    }
    return Promise.reject(error);
  }
);

export function request(options) {
  return new Promise((resolve, reject) => {
    axiosInstance({
      ...options,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
