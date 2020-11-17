import React, { Component, useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { AtIcon } from "taro-ui";
import { View, Button, Input, Image,Picker } from "@tarojs/components";
import style from "./index.module.less";
import PopUp from "@/components/Pop-ups/text";
import { user_icon } from "@/assets/model";
import { modifyAvatar } from "@/models/user";
import {
  checkRegister, // 检查是否注册
  getUserInfo // 获取登录信息
} from "@/models/user";
export default () => {
  const [pop_show, setPopShow] = useState<boolean>(false);
  const [time,setTime] = useState<string>('')
  const [user,setUser] = useState<any>({
    image: "",
    outletsId: 0,
    outletsName: "",
    phone: "",
    realName: ""
  })
  const handleSend = () => {
    Taro.navigateBack({ delta: 1 });
  };
  useEffect(() => {
    getUserMessage();
  }, []);
  const changeImage = () => {
    Taro.chooseImage({
      count: 1,
      success: res => {
        const { errMsg, tempFilePaths } = res;
        if (errMsg === "chooseImage:ok") {
          modifyAvatar({ image: tempFilePaths[0] }).then(e => {
            if (e.code === 200) {
              let u = {...user}
              u.image = tempFilePaths[0]
              setUser(u)
            }
          });
        }
      }
    });
  };
  const logoutUser = () => {
    Taro.setStorageSync("token", "");
    Taro.setStorageSync("user", {
      name: "",
      phone: ""
    });
    Taro.reLaunch({ url: "/pages/first/index" });
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
    <View className={style.username_box}>
      <PopUp
        show={pop_show}
        setShow={setPopShow}
        title={"邀请码不存在,请重新输入"}
      />
      <View
        style={{
          padding: "0 15px",
          boxSizing: "border-box",
          width: "100%",
          backgroundColor: "#fff"
        }}
      >
        <View className={style.name_ipt_item} style={{ height: "80px" }}>
          <View className={style.name_item_lebal}>头像</View>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              flex: "auto",
              justifyContent: "flex-end"
            }}
            onClick={() => changeImage()}
          >
            <Image
              src={user.image === "" ? user_icon : user.image}
              className={style.avator_img}
            />
            <AtIcon value="chevron-right" size="15" color="#A8A8A8" />
          </View>
        </View>
        <View className={style.name_ipt_item}>
          <View className={style.name_item_lebal}>账号昵称</View>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              flex: "auto",
              justifyContent: "flex-end"
            }}
            onClick={() => Taro.navigateTo({ url: "/pages/person-set/name" })}
          >
            <View className={style.name_item_text}>{user.realName}</View>
            <AtIcon value="chevron-right" size="15" color="#A8A8A8" />
          </View>
        </View>
        <View className={style.name_ipt_item}>
          <View className={style.name_item_lebal}>绑定手机号</View>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              flex: "auto",
              justifyContent: "flex-end"
            }}
            onClick={() => Taro.navigateTo({ url: "/pages/person-set/phone" })}
          >
            <View className={style.name_item_text}>{user.phone}</View>
            <AtIcon value="chevron-right" size="15" color="#A8A8A8" />
          </View>
        </View>
        <View className={style.name_ipt_item}>
          <View className={style.name_item_lebal}>阳历生日</View>
          <Picker
            mode="date"
            className={style.name_item_text}
            value={time}
            onChange={e => setTime(e.detail.value)}
          >
            <View>{time === "" ? "请选择日期" : ''}</View>
          </Picker>
        </View>
        <View className={style.name_ipt_item}>
          <View className={style.name_item_lebal}>阴历生日</View>
          <Input className={style.name_item_text} value={''} />
        </View>
        <View className={style.name_ipt_item} style={{ border: "none" }}>
          <View className={style.name_item_lebal}>籍贯</View>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              flex: "auto",
              justifyContent: "flex-end"
            }}
          >
            <View className={style.name_item_text}>{''}</View>
            <AtIcon value="chevron-right" size="15" color="#A8A8A8" />
          </View>
        </View>
      </View>
      <View className={style.btn_box} style={{ marginTop: "30px" }}>
        <Button className={style.btn} onClick={() => logoutUser()}>
          退出登录
        </Button>
      </View>
    </View>
  );
};
