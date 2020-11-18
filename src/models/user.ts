import { _get, _post, _put } from "../services/request";
import Taro from '@tarojs/taro'
import API_PATH, { ACCESS_TOKEN } from "../services/env";
export const checkRegister = (data: { phone: string }) => {
  return _post("/hydropower/login/phone", data);
};

export const getUserInfo = () => {
  return _get("/hydropower/login/user/info");
};

export const postCodeMessage = code => {
  return _get(`/hydropower/login/code/outlets?code=${code}`);
};

// 发送验证码
export const getVerificationCode = (phone: string) => {
  return _post("/hydropower/login/send/sms", { phone, type: 7 });
};

// 注册
export const postRegister = ({
  name='',
  phone,
  id
}: {
  id:number
  phone: string;
  name?:string
}) => {
  return _post("/hydropower/login/register", { name, phone, outletsId: id });
};

// 修改头像
export const modifyAvatar = (data: { image?: string }) => {
  return _post("/hydropower/login/update/image", data);
};

// 修改昵称
export const modifyName = (data: { name?: string }) => {
  return _post("/hydropower/login/change/name", data);
};
export const modifySolarTime = (t) => {
  return _post("/hydropower/login/change/user/info", {
    solarTime:t
  });
};
export const modifyInfo = (data:{
  cityName: string,
	name: string,
	provinceName: string,
	solarTime: number
}) => {
  return _post("/hydropower/login/change/user/info", data);
};
// 修改手机号码
export const modifyPhoneNumber = (data: {
  code?: string;
  newPhone?: string;
  oldPhone?: string;
}) => {
  return _post("/hydropower/login/change/phone", data);
};

export const pickTimeSolar = (time:number)=>{
   return _post(`/hydropower/login/obtain/lunar`,{solarTime:time})
}
export const postFileAvator = async (path:string)=>{
  // 上传头像
  let {data} = await Taro.uploadFile({
    url: API_PATH + "/hydropower/login/upload",
    filePath: path, 
    name: 'file',
    header: { "Content-Type": "multipart/form-data" },
    formData: {
      '"accessToken"': ACCESS_TOKEN
    }
  })
  return JSON.parse(data) as any
}