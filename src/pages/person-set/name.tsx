import React, { Component, useState, useEffect, useCallback } from "react";
import Taro from "@tarojs/taro";
import ChangeIpt from "./components/changeIpt";
import { View, Input } from "@tarojs/components";
import style from "./index.module.less";
import PopUp from "@/components/Pop-ups/text";
import { modifyName } from "@/models/user";

export default () => {
  const [name, setName] = useState<string>("1号网点上海市徐汇区");
  const [pop_show, setPopShow] = useState<boolean>(false);
  const [info_text, setInfoText] = useState<string>("");
  useEffect(()=>{
    let {realName} = Taro.getStorageSync('user') || {realName:''}
     setName(realName)
  },[])
  const handleSend = ()=>{
    modifyName({ name: name }).then(e => {
      if (e.code === 200) {
        setPopShow(true);
        setInfoText("修改成功");
        setTimeout(()=>{
          Taro.navigateBack({ delta: 1 });
        },1000)
      }
    });
  }

  return (
    <View className={style.username_box}>
      <PopUp show={pop_show} setShow={setPopShow} title={info_text} />
      <ChangeIpt handleOk={handleSend}>
        <View className={style.name_ipt_item}>
          <View className={style.name_item_lebal}>账号昵称</View>
          <Input
            className={style.name_item_text}
            value={name}
            onInput={e => setName(e.detail.value)}
          />
        </View>
      </ChangeIpt>
    </View>
  );
};
