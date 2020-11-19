import React, { Component, useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { AtIcon } from "taro-ui";
import { View, Button, Input, Image,Picker } from "@tarojs/components";
import style from "./index.module.less";
import PopUp from "@/components/Pop-ups/text";
import { user_icon } from "@/assets/model";
import { modifyAvatar,pickTimeSolar,modifySolarTime,postFileAvator,modifyInfo } from "@/models/user";
import {Iuser} from '../tabPage/myhome/type'
import mapData from '@/utils/map'
import {
  checkRegister, // 检查是否注册
  getUserInfo // 获取登录信息
} from "@/models/user";
import { filterTimeDay,opTimeUnix,filterTimeDayN } from "@/utils/filter";
export default () => {
  const [pop_show, setPopShow] = useState<boolean>(false);
  const [time,setTime] = useState<string>('')
  const [time_n,setTimeN] = useState<number>(0)
  const [citys,setCity] = useState<any>([])
  const [c,setC] = useState<number>(0)
  const [p,setP] = useState<number>(0)
  const [user,setUser] = useState<Iuser>({
    image: "",
    outletsId: 0,
    outletsName: "",
    phone: "",
    realName: "",
    solarTime:0,
    cityName:'',
    provinceName:''
  })
  useEffect(() => {
    getUserMessage();
  }, []);
  const changeImage = () => {
    Taro.chooseImage({
      count: 1,
      success: res => {
        const { errMsg, tempFilePaths } = res;
        if (errMsg === "chooseImage:ok") {
          postFileAvator(tempFilePaths[0]).then(ele=>{
            let {code,data} = ele
            if(code===200){
                modifyAvatar({ image: data }).then(e => {
              if (e.code === 200) {
                let u = {...user}
                u.image = tempFilePaths[0]
                setUser(u)
                getUserMessage()
              }
              });
            }
          })
          
        }
      }
    });
  };
  const logoutUser = () => {
    Taro.setStorageSync("token", "");
    Taro.setStorageSync("user", {
      image: "",
      outletsId: 0,
      outletsName: "",
      phone: "",
      realName: "",
      solarTime:0,
      cityName:'',
      provinceName:''
    });
    Taro.reLaunch({ url: "/pages/first/index?login=true" });
  };
  const getUserMessage = () => {
    getUserInfo().then(res => {
      const { code, data } = res;
      if (code === 200) {
        pickTime(data.solarTime)
        setTime(filterTimeDay(data.solarTime))
        Taro.setStorageSync("user", data);
        setUser(data);
      }else {

      }
    });
  };
  const pickTime = (t:number)=>{
    pickTimeSolar(t).then(res=>{
      let {data} = res
      setTimeN(data)
    })
  }
  const changeTime = (t:string)=>{
    setTime(t)
    modifySolarTime(opTimeUnix(t)).then(res=>{
      let {code} = res
      if(code===200){
        setPopShow(true)
        getUserMessage()
      }
    })
    pickTimeSolar(opTimeUnix(t)).then(res=>{
      let {data} = res
      setTimeN(data)
    })
  }
  const changeAddress = (e)=>{
    let d= {...user}
    d.provinceName = mapData[e.value[0]].value
    d.cityName = citys[e.value[1]].value
    
    modifyInfo({
      solarTime:d.solarTime,
      name:d.realName,
      provinceName:d.provinceName,
      cityName:d.cityName
    }).then(res=>{
      let {code,message} = res
      if(code===200){
        setPopShow(true)
        setUser(d)
        getUserMessage()
      }else {
        
      }
    })
  }
  const onColumnChange = (e)=>{
     if(e.column===0){
      setCity(mapData[e.value].children)
      setP(e.value)
     }else {
       setC(e.value)
     }
  }
  return (
    <View className={style.username_box}>
      <PopUp
        show={pop_show}
        setShow={setPopShow}
        title={"修改成功"}
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
            onChange={e => changeTime(e.detail.value)}
          >
            <View>{user.solarTime&&time != "" ? time:"请选择日期"}</View>
          </Picker>
        </View>
        <View className={style.name_ipt_item}>
          <View className={style.name_item_lebal}>阴历生日</View>
          <Input className={style.name_item_text} disabled value={user.solarTime?filterTimeDayN(time_n):'暂无'} />
        </View>
        <View className={style.name_ipt_item} style={{ border: "none" }}>
          <View className={style.name_item_lebal}>籍贯</View>
          <Picker
            mode="multiSelector"
            range={[mapData,citys]}
            rangeKey={'label'}
            className={style.name_item_text}
            value={[p,c]}
            onChange={e => changeAddress(e.detail)}
            onColumnChange={(e)=>onColumnChange(e.detail)}
           >
            <View
            style={{
              display: "flex",
              alignItems: "center",
              flex: "auto",
              justifyContent: "flex-end"
            }}
           >
           
            <View className={style.name_item_text}>{user.provinceName===user.cityName?user.provinceName:user.provinceName+ ' ' + user.cityName}</View>
            <AtIcon value="chevron-right" size="15" color="#A8A8A8" />
           </View>
          </Picker>
          
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
