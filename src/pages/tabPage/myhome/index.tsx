import React, { Component, useState, useEffect } from "react";
import { View, Button, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { user_icon } from "@/assets/model";
import style from "./index.module.less";
import { Iuser } from "./type";
import API_PATH from "../../../services/env";
import {
  checkRegister, // 检查是否注册
  getUserInfo, // 获取登录信息
  putPhoneWith,// 获取手机号
} from "@/models/user";
export default () => {
  const [token, setToken] = useState<string>("");
  const [user, setUser] = useState<Iuser>({
    image: "",
    outletsId: 0,
    outletsName: "",
    phone: "",
    realName: "",
    solarTime:0,
    cityName:'',
    provinceName:''
  });
    useEffect(() => {
      let t = Taro.getStorageSync('token') || ''
      setToken(t)
      if(t!=''){
        getUserMessage();
      }
    }, []);
  const userLogin = (e:any) => {
    Taro.login().then(res => {
      putPhoneWith({
        iv:e.detail.iv,
        encryptData:e.currentTarget.encryptedData,
        code:res.code
      }).then(ele=>{
         let {code,data} = ele
          if(code===200){
            Taro.setStorageSync("phone", data.phoneNumber);
          check(data.phoneNumber);
          }else {

          }
      })
      
    });
  };
  const check = (phone: string) => {
    checkRegister({ phone }).then(res => {
      const { register, token } = res.data;
      if (register) {
        Taro.setStorageSync("token", token);
        Taro.reLaunch({url:'/pages/first/index?login=true'})
      } else {
        Taro.navigateTo({ url: "/pages/user-login-code/index" });
      }
    });
  };
  const getUserMessage = () => {
    getUserInfo().then(res => {
      const { code, data } = res;
      if (code === 200) {
        Taro.setStorageSync("user", data);
        setUser(data);
      }
    });
  };
  return (
    <View className={style.box}>
      <View className={style.message_box}>
        <Image
          src={token != ""&&user.image!='' ? user.image : user_icon}
          className={style.message_user_icon}
        />
        <View className={style.message_title_box}>
          <View className={style.message_title}>
            {token != "" ? user.realName : "未登录"}
          </View>
          <View className={style.message_text}>
            {token != "" ? user.phone : "登录后可使用"}
          </View>
        </View>
        {token != "" ? (
          <View
            className={style.go_endit}
            onClick={() => Taro.navigateTo({ url: "/pages/person-set/index" })}
          >
            设置&gt;
          </View>
        ) : (
          ""
        )}
      </View>
      {!token && (
        <View className={style.btn_box}>
          <Button
            className={style.btn}
            openType="getPhoneNumber"
            onGetPhoneNumber={userLogin}
          >
            立即登录
          </Button>
          {/* <Button
            className={style.btn}
            onClick={()=>{
              Taro.setStorageSync("phone", "18154175568");
              check("18154175568");
             }}
            >
            立即登录
          </Button> */}
        </View>
      )}
    </View>
  );
};
