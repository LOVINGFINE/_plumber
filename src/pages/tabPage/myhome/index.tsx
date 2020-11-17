import React, { Component, useState, useEffect } from "react";
import { View, Button, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { user_icon } from "@/assets/model";
import style from "./index.module.less";
import { Iuser } from "./type";
import API_PATH from "../../../services/env";
import {
  checkRegister, // 检查是否注册
  getUserInfo // 获取登录信息
} from "@/models/user";
export default () => {
  const [token, setToken] = useState<string>("");
  const [user, setUser] = useState<Iuser>({
    image: "",
    outletsId: 0,
    outletsName: "",
    phone: "",
    realName: ""
  });
    useEffect(() => {
      setToken(Taro.getStorageSync('token') || '')
      getUserMessage();
    }, []);
  const userLogin = () => {
    Taro.login().then(res => {
      Taro.setStorageSync("phone", "15000558033");
      check("15000558033");
    });
  };
  const check = (phone: string) => {
    checkRegister({ phone }).then(res => {
      const { register, token } = res.data;
      if (register) {
        setToken(token);
        Taro.setStorageSync("token", token);
        getUserMessage();
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
          src={token != ""&&user.image!=='' ? user.image : user_icon}
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
        </View>
      )}
    </View>
  );
};
