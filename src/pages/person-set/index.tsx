import React, { Component, useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { AtIcon,AtToast } from "taro-ui";
import { View, Button, Input, Image,Picker } from "@tarojs/components";
import style from "./index.module.less";
import PopUp from "@/components/Pop-ups/info";
import { user_icon } from "@/assets/model";
import { modifyAvatar,modifySolarTime,postFileAvator,modifyInfo } from "@/models/user";
import {Iuser} from '../tabPage/myhome/type'
import mapData from '@/utils/map'
import {calendar} from '@/utils/transformTime'
import {
  getUserInfo // 获取登录信息
} from "@/models/user";
import { opTimeUnix,filterTimeDayN } from "@/utils/filter";
export default () => {
  const [loading,setLoading] = useState<boolean>(false)
  const [pop_show, setPopShow] = useState<boolean>(false);
  const [pop_text,setPopText] = useState<string>('')
  const [time,setTime] = useState<string>('')
  const [time_n,setTimeN] = useState<string>('')
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
  const [provinceName,setProvinceName] = useState<string>('')
  useEffect(() => {
    getUserMessage(false);
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
                getUserMessage(true)
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
  const getUserMessage = (type) => {
    getUserInfo().then(res => {
      const { code, data,message } = res;
      setLoading(false)
      if (code === 200) {
        let t_l = filterTimeDayN(data.solarTime).split('-')
        let o:any = calendar.solar2lunar(t_l[0],t_l[1],t_l[2])
        setTime(filterTimeDayN(data.solarTime))
        setTimeN(o.lunarDate)
        Taro.setStorageSync("user", data);
        setProvinceName(data.provinceName?data.provinceName:'')
        setUser(data);
        if(type){
          setTimeout(()=>{
            popTextAlert('修改成功')
          },500)
        }
      }else {
        setTimeout(()=>{
          popTextAlert(message)
        },500)
      }
    });
  };
  const changeAddress = (e)=>{
    //修改籍贯
    if(citys.length>0){
      let d= {...user}
      d.provinceName = mapData[e.value[0]].value
      d.cityName = citys[e.value[1]].value
      modifyUserMessage(d)
    }else {
      popTextAlert('请选择籍贯城市名')
    }
  }
  const setAddress = (e:string)=>{
    //修改籍贯
    if(e.length>0){
      let d= {...user}
      d.provinceName = e
      modifyUserMessage(d)
    }else {
      popTextAlert('请输入籍贯')
    }
  }
  const onColumnChange = (e)=>{
     if(e.column===0){
      setCity(mapData[e.value].children)
      setP(e.value)
     }else {
       setC(e.value)
     }
  }
  const changeTimeOption = (text:string,type)=>{
    // 修改生日
    setLoading(true)
    let d_user= {...user}
    let t_l = text.split('-')
    if(type==='solar'){
      // 处理阳历
      let o:any = calendar.solar2lunar(t_l[0],t_l[1],t_l[2])
      d_user.solarTime = opTimeUnix(text)
      modifyUserMessage(d_user)
    }else {
      // 处理农历
      let o:any = calendar.lunar2solar(t_l[0],t_l[1],t_l[2],'')
      d_user.solarTime = opTimeUnix(o.date) 
      modifyUserMessage(d_user)
    }

  }
  const popTextAlert = (text:string) =>{
      setPopText(text)
      setPopShow(true)
  }
  const modifyUserMessage = (data:any)=>{
      // 提交数据 
    modifyInfo({
      solarTime:data.solarTime,
      name:data.realName,
      provinceName:data.provinceName,
      cityName:data.cityName
    }).then(res=>{
      let {code,message} = res
      if(code===200){
        getUserMessage(true)
      }else {
        setLoading(false)
        setTimeout(()=>{
          popTextAlert(message)
        },500)
      }
    })
  }
  return (
    <View className={style.username_box}>
      <PopUp
        show={pop_show}
        setShow={setPopShow}
        title={pop_text}
      />
      <AtToast isOpened={loading} text="检验修改" hasMask={true} duration={0} status="loading"></AtToast>
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
            onClick={() => Taro.redirectTo({ url: "/pages/person-set/name" })}
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
            onChange={e => changeTimeOption(e.detail.value,'solar')}
          >
            <View>{user.solarTime&&time != "" ? time:"请选择日期"}</View>
          </Picker>
        </View>
        <View className={style.name_ipt_item}>
          <View className={style.name_item_lebal}>阴历生日</View>
          <Picker
          mode="date"
          className={style.name_item_text}
          value={time_n}
          onChange={e => changeTimeOption(e.detail.value,'lunar')}
           >
          <View>{user.solarTime&&time!=''?time_n:'暂无'}</View>
        </Picker>
        </View>
        <View className={style.name_ipt_item} style={{ border: "none" }}>
          <View className={style.name_item_lebal}>籍贯</View>
          <Input
          className={style.name_item_text}
          value={provinceName}
          placeholder={'请输入籍贯'}
          confirmType='send'
          onInput={e => setProvinceName(e.detail.value)}
          onConfirm={(e)=>setAddress(e.detail.value)}
        />
          {/* <Picker
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
           */}
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
