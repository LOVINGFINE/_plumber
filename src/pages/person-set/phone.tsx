import React, { useState, useEffect, } from "react";
import Taro from "@tarojs/taro";
import ChangeIpt from "./components/changeIpt";
import { View, Input } from "@tarojs/components";
import style from "./index.module.less";
import PopUp from "@/components/Pop-ups/text";
import { getVerificationCode, modifyPhoneNumber } from "@/models/user";
export default () => {
  const [old, setOld] = useState<string>("");
  const [newVal, setNewVal] = useState<string>("");
  const [pop_show, setPopShow] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [info_text, setInfoText] = useState<string>("");
  const [forTime,setForTime] = useState<boolean>(false)
  const [user,setUser] = useState<any>('')
  useEffect(() => {
    let d = Taro.getStorageSync("user") || { phone: "" };
    setUser(d)
    setOld(d.phone);
  }, []);
  const handleSend = ()=>{
    console.log(1);
    
    if(code.length===6){
      if(regPhone(newVal)){
        modifyPhoneNumber({
          code: code,
          newPhone: newVal,
          oldPhone: old
        }).then(e => {
          if (e.code === 200) {
            // 验证规则(手机号、验证码)
            let a = {...user}
            a.phone = newVal
            Taro.setStorageSync('user',a)
            Taro.redirectTo({ url: '/pages/person-set/index' });
            // Taro.clearStorage()
            // Taro.reLaunch({ url: '/pages/person-set/index?login=true' });
          }else {
            setInfoText(e.message)
            setPopShow(true)
          }
        });
      }else {
        setInfoText('请填入正确的手机号')
      }
      
    }else {
      setInfoText('请填入6位验证码')
      setPopShow(true)
    }
  }
  const regPhone = (text:string) =>{
    return text.length===11
 }
  const handleCodeSend = ()=>{
    if(newVal!==''){
      setForTime(true)
      getVerificationCode(old).then(e => {
        if (e.code === 200) {
          setForTime(true)
        } else {
          setInfoText(e.message)
          setPopShow(true)
        }
      });
    }else {
      setInfoText('请填入新的手机号')
      setPopShow(true)
    }
  }
 const onTimeUp=()=>{
      setForTime(false)
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
          {!forTime ? (
            <View className={style.get_code} onClick={handleCodeSend}>
              获取验证码
            </View>
          ) : (
            <View className={style.not_get}> 重新获取 <TimeDown onTimeUp={onTimeUp} /> s </View>
          )}
        </View>
      </ChangeIpt>
    </View>
  );
};

const TimeDown =(
  {
    num=60,
    onTimeUp
  }:{
    num?:number,
    onTimeUp?:()=>void
  })=>{
    const [time,setTime] = useState<number>(num)
    useEffect(()=>{
      setTimeout(()=>{
        let t = time - 1
        if(time>1){ 
          setTime(t)
        }else {
          onTimeUp()
        }
      },1000)
    },[time])
    return <>{time}</>
}
