import axios from "taro-axios";
import API_PATH, { ACCESS_TOKEN } from "./env";
import Taro from '@tarojs/taro'
const http = axios.create({
  baseURL: API_PATH, //接口地址 本地测试
  timeout: 20000
});
http.defaults.headers.post["Content-Type"] = "application/json";

http.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    return response.status === 200
      ? Promise.resolve(response)
      : Promise.reject(response);
  },
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        case 400:
          console.log("参数异常");
          break;
        // 401: 未授权
        case 401:
          Taro.setStorageSync("token", '');
          Taro.reLaunch({ url: "/pages/first/index" });
          break;
        case 403:
          console.log("没有权限");
          break;
        case 404:
          console.log("页面没找到");
          break;
        default:
          console.log("出错了");
      }
      return Promise.reject(error.response);
    }
  }
);

http.interceptors.request.use(
  config => {
    if (ACCESS_TOKEN) {
      config.headers.common["accessToken"] = ACCESS_TOKEN;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export const _get = async (url: string, params?: any) => {
  const res = await http.get(url, {
    params
  });
  return res.data;
};

export const _delete = async (url: string) => {
  let res = await http.delete(url);
  return res.data;
};

export const _post = async (url: string, data?: any) => {
  let res = await http.post(url, data);
  return res.data;
};

export const _put = async (url: string, data?: any) => {
  let res = await http.put(url, data);
  return res.data;
};
export default http;
