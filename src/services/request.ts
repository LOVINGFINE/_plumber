import axios from 'taro-axios';
import API_PATH,{ACCESS_TOKEN} from './env'
// axios.defaults.baseURL = API_PATH; //接口地址 本地测试
// axios.defaults.timeout = 20000;
// axios.defaults.headers.post['Content-Type'] = 'application/json';
let http = axios.create({
  baseURL : API_PATH,//接口地址 本地测试
  timeout :20000,
  headers:{
  post:{'Content-Type': 'application/json'}
 }
})
http.interceptors.response.use(
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

http.interceptors.request.use(
  (config) => { 
    if(ACCESS_TOKEN!=''){
      config.headers.common['accessToken'] = ACCESS_TOKEN
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const  _get = async (url: string) => {
  let res = await axios.get(url);
  return  res.data
};
export const _delete = async(url: string) => {
  let res = await axios.delete(url);
  return  res.data
};
export const _post = async (url: string, data?: any) => {
  let res = await axios.post(url, data);
  return  res.data
};
export const _put = async (url: string, data?: any) => {
  let res = await axios.put(url, data);
  return  res.data
};
export default http