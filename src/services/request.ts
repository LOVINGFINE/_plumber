import axios from 'axios';
import API_PATH from './env'
axios.defaults.baseURL = API_PATH; //接口地址 本地测试
axios.defaults.timeout = 20000;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.interceptors.response.use(
  (response) => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    switch(response.status){
      case 401:
    
        break;
      case 403:
 
        break;
      case 500:
        
        break;
      case 503:
        
        break;
      default:
       
      break;
    }
    return Promise.resolve(response);
  },
  (error) => {
    // history.push('/404')
    return Promise.reject(error);
  },
);

axios.interceptors.request.use(
  (config) => { 
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const _get = (url: string) => {
  return axios.get(url);
};
export const _delete = (url: string,data?:any) => {
  if(data){
    return axios.delete(url,data);
    
  }else {
    return axios.delete(url);
  }
};
export const _post = (url: string, data?: any) => {
  return axios.post(url, data);
};
export const _put = (url: string, data?: any) => {
  return axios.put(url, data);
};
export default axios