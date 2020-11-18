import React, { useState, useEffect, useCallback } from "react";
import Taro from "@tarojs/taro";
import ChangeIpt from "./components/changeIpt";
import { View, Input } from "@tarojs/components";
import style from "./index.module.less";
import PopUp from "@/components/Pop-ups/text";
import { getVerificationCode, modifyPhoneNumber } from "@/models/user";
export default () => {
  const time = 60;
  const [old, setOld] = useState<string>("");
  const [newVal, setNewVal] = useState<string>("");
  const [pop_show, setPopShow] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [info_text, setInfoText] = useState<string>("");
  useEffect(() => {
    let d = Taro.getStorageSync("user") || { phone: "" };
    setOld(d.phone);
  }, []);
  const handleSend = ()=>{
    modifyPhoneNumber({
      code: code,
      newPhone: newVal,
      oldPhone: old
    }).then(e => {
      if (e.code === 200) {
        // 验证规则(手机号、验证码)
        console.log("修改手机号成功");
        Taro.redirectTo({ url: '/pages/person-set/index' });
      }else {
        setInfoText(e.message)
        setPopShow(true)
      }
    });
  }

  const handleCodeSend = ()=>{
    getVerificationCode(old).then(e => {
      if (e.code === 200) {
        console.log("获取验证码成功");
      }
    });
  }

  return (
    <View className={style.username_box}>
      <PopUp show={pop_show} setShow={setPopShow} title={info_text} />
      <ChangeIpt handleOk={handleSend}>
        <View className={style.name_ipt_item}>
          <View className={style.name_item_lebal}>旧手机号</View>
          <Input
            className={style.name_item_text}
            style={{ color: "#999", textAlign: "left" }}
            value={old}
            disabled
            onInput={e => setOld(e.detail.value)}
          />
        </View>
        <View className={style.name_ipt_item}>
          <View className={style.name_item_lebal}>新手机号</View>
          <Input
            className={style.name_item_text}
            style={{ textAlign: "left" }}
            value={newVal}
            onInput={e => setNewVal(e.detail.value)}
          />
        </View>
        <View className={style.name_ipt_item}>
          <View className={style.name_item_lebal}>验证码</View>
          <Input
            className={style.name_item_text}
            style={{ textAlign: "left" }}
            value={code}
            placeholder="请输入验证码"
            onInput={e => setCode(e.detail.value)}
          />
          {time === 60 ? (
            <View className={style.get_code} onClick={handleCodeSend}>
              获取验证码
            </View>
          ) : (
            <View className={style.not_get}>重新获取 {time} s</View>
          )}
        </View>
      </ChangeIpt>
    </View>
  );
};
