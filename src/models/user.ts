import { _get, _post, _put } from "../services/request";

export const checkRegister = (data: { phone: string }) => {
  return _post("/hydropower/login/phone", data);
};

export const getUserInfo = () => {
  return _get("/hydropower/login/user/info");
};

export const postCodeMessage = code => {
  return _post(`/hydropower/login/code/outlets?code=${code}`);
};

// 发送验证码
export const getVerificationCode = (phone: string) => {
  return _post("/hydropower/login/send/sms", { phone, type: 7 });
};

// 注册
export const postRegister = ({
  name,
  phone
}: {
  name?: string;
  phone?: string;
}) => {
  return _post("/hydropower/login/register", { name, phone, outletsId: 0 });
};

// 修改头像
export const modifyAvatar = (data: { image?: string }) => {
  return _post("/hydropower/login/update/image", data);
};

// 修改昵称
export const modifyName = (data: { name?: string }) => {
  return _post("/hydropower/login/change/name", data);
};

// 修改手机号码
export const modifyPhoneNumber = (data: {
  code?: string;
  newPhone?: string;
  oldPhone?: string;
}) => {
  return _post("/hydropower/login/change/phone", data);
};
