import React, { Component, useState, useEffect } from "react";
import { View, Button, Image } from "@tarojs/components";
import { AtIcon,AtToast  } from 'taro-ui'
import Taro,{useDidShow} from "@tarojs/taro";
import { user_icon } from "@/assets/model";
import style from "./index.module.less";
import { Iuser } from "./type";
import PopUp from "@/components/Pop-ups/text";
import {
  checkRegister, // 检查是否注册
  getUserInfo, // 获取登录信息
  putPhoneWith,// 获取手机号
} from "@/models/user";
export default ({
  checkToken
}:{
  checkToken:(fun:()=>void)=>void
}) => {
  const [token, setToken] = useState<string>("");
  const [pop_show, setPopShow] = useState<boolean>(false);
 const [pop_text,setText] = useState<string>('')
 const [phone,setphone] = useState<string>('')
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
  const [loading,setLoad] = useState<boolean>(false)
  useDidShow(() => {
    　　let t = Taro.getStorageSync('token') || ''
       setphone(Taro.getStorageSync('phone')||'')
      setToken(t)
      if(t!=''){
        getUserMessage();
      }
    })
  const userLogin = (e:any) => {
    setLoad(true)
    if(phone===''){
      Taro.login().then(res => {
        putPhoneWith({
          iv:e.detail.iv,
          encryptData:e.currentTarget.encryptedData,
          code:res.code
        }).then(ele=>{
           let {code,data,message} = ele
           setLoad(false)
            if(code===200){
              Taro.setStorageSync("phone", data.phoneNumber);
              check(data.phoneNumber);
            }else {
              popBoxInfo(message)
            }
        }).catch(()=>{
          setLoad(false)
        })
      });
    }else {
      check(phone)
    }
   
    // const feedPhone = ()=>{
    //   Taro.login().then(res => {
    //     putPhoneWith({
    //       iv:e.detail.iv,
    //       encryptData:e.currentTarget.encryptedData,
    //       code:res.code
    //     }).then(ele=>{
    //        let {code,data,message} = ele
    //         if(code===200){
    //           Taro.setStorageSync("phone", data.phoneNumber);
    //           check(data.phoneNumber);
    //         }else {
              
    //         }
    //     }).catch(()=>{
    //       setLoad(false)
    //     })
        
    //   });
    // }
    // Taro.checkSession().then(()=>{
    //   feedPhone()
    // }).catch(()=>{
    //   console.log('失效');
      
    //   feedPhone()
    // })
  };
  const popBoxInfo = (text:string)=>{
    setText(text)
    setPopShow(true)
  }
  const check = (phone: string) => {
    checkRegister({ phone }).then(res => {
      let {code,message} = res
      if(code===200){
        const { register, token } = res.data;
        if (register) {
          Taro.setStorageSync("token", token);
          setLoad(false)
          Taro.reLaunch({url:'/pages/first/index?login=true'})
        } else {
          Taro.navigateTo({ url: "/pages/user-login-code/index" });
        }
      }else {
        setLoad(false)
        popBoxInfo(message) 
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
      <AtToast isOpened={loading} text="登录中" hasMask={true} duration={10000} status="loading"></AtToast>
      <PopUp
        show={pop_show}
        setShow={setPopShow}
        title={pop_text}
      />
      <View className={style.message_box}>
        <Image
          src={token != ""&&user.image!='' ? user.image : user_icon}
          className={style.message_user_icon}
        />
        <View className={style.message_title_box}>
          <View className={style.message_title}>
            {token != "" ? user.outletsName : "未登录"}
          </View>
          <View className={style.message_text}>
            {token != "" ? user.phone : "登录后可使用"}
          </View>
        </View>
        {token != "" ? (
          <View
            className={style.go_endit}
            onClick={() => Taro.navigateTo({ url: "/pages/person-set/index" })}>
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
              Taro.setStorageSync("phone", "13771525262");
              check("13771525262");
             }}
            >
            立即登录
          </Button> */}
        </View>
      )}
    </View>
  );
};
