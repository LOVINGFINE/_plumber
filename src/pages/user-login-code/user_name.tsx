import React, { useState, useEffect, useMemo } from "react";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { View, Button, Input } from "@tarojs/components";
import { Picker } from "@tarojs/components";
import style from "./index.module.less";
import PopInfo from "@/components/Pop-ups/info";
import checkEmpty from "@/utils/checkEmpty";
import { modifyInfo } from "@/models/user";
import { filterTimeDay,opTimeUnix,filterTimeDayN } from "@/utils/filter";
import mapData from '@/utils/map'
import {calendar} from '@/utils/transformTime'
export default (props: any) => {
  // 获取本地手机号
  const phone = Taro.getStorageSync("phone");
  const [name, setName] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [time_n, setTimeN] = useState<string>('');
  const [warn_text, setWarnText] = useState<string>("");
  const [info_show, setInfoShow] = useState<boolean>(false);
  const [citys,setCity] = useState<any>([])
  const [c,setC] = useState<number>(0)
  const [p,setP] = useState<number>(0)
  const [cityName,setCityName] = useState<string>('')
  const [provinceName,setProvinceName] = useState<string>('')
  
  const handleSend = () => {
    let isPy =  checkEmpty([name, time, time_n,provinceName])
    if (isPy ||isPy === 0) {
      sendInfo(isPy);
    } else {
      // 注册
      modifyInfo({ name, solarTime:opTimeUnix(time),cityName,provinceName }).then(e => {
          if (e.code === 200) {
        // 非空验证成功
            Taro.reLaunch({ url: "/pages/first/index?isFrist=true" });
          }else {
            setWarnText(e.message)
            setInfoShow(true)
          }
      });
    }
  };

  const sendInfo = e => {
    switch (e) {
      case 0:
        setWarnText("姓名不能为空");
        break;
      case 1:
        setWarnText("生日不能为空");
        break;
      case 2:
        setWarnText("生日不能为空");
        break;
      case 3:
        setWarnText("籍贯不能为空");
        break;
      default:
        break;
    }
    setInfoShow(true);
  };
  const changeAddress = (e)=>{
    if(citys.length>0){
      setProvinceName(mapData[e.value[0]].value)
      setCityName(citys[e.value[1]].value) 
    }else {
      setWarnText('请选择籍贯城市名')
      setInfoShow(true);
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
    let t_l = text.split('-')
    if(type==='solar'){
      // 处理阳历
      setTime(text)
      let o:any = calendar.solar2lunar(t_l[0],t_l[1],t_l[2])
      setTimeN(o.lunarDate)
      
    }else {
      // 处理农历
      setTimeN(text)
      let o:any = calendar.lunar2solar(t_l[0],t_l[1],t_l[2],'')
      setTime(o.date)
    }

  }
  return (
    <View className={style.username_box}>
      <PopInfo title={warn_text} show={info_show} setShow={setInfoShow} />
      <View className={style.name_ipt_item}>
        <View className={style.name_item_lebal}>姓名</View>
        <Input
          className={style.name_item_text}
          value={name}
          onInput={e => setName(e.detail.value)}
        />
      </View>
      <View className={style.name_ipt_item}>
        <View className={style.name_item_lebal}>阳历生日</View>
        <Picker
          mode="date"
          className={style.name_item_text}
          value={time}
          onChange={e => changeTimeOption(e.detail.value,'solar')}
        >
          <View>{time === "" ? "请选择日期" : time}</View>
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
          <View>{time_n === "" ? "请选择日期" : time_n}</View>
        </Picker>
      </View>
      <View className={style.name_ipt_item}>
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
           >{
            (provinceName+cityName)===''?(<View className={style.name_item_text}>请选择籍贯</View>):(<View className={style.name_item_text}>{provinceName+ ' ' + cityName}</View>)
           }
            
           </View>
          </Picker>
      </View>
      <View className={style.bottom_btn_box}>
        <Button className={style.bottom_btn} onClick={handleSend}>
          提交
        </Button>
      </View>
    </View>
  );
};
