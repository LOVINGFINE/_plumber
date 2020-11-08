import React, { Component,useState,useEffect } from 'react'
import Taro from '@tarojs/taro'
import {
View,
Button,
Input
} from '@tarojs/components'
import {Picker} from '@tarojs/components'
import style from './index.module.less'
import PopUp from '@/components/Pop-ups/text'
import PopInfo from '@/components/Pop-ups/info'
import checkEmpty from '@/utils/checkEmpty'
export default ()=>{
      const [name,setName] = useState<string>('')
      const [time,setTime] = useState<string>('')
      const [time_n,setTimeN] = useState<string>('')
      const [address,setAddress] = useState<string>('')
      const [pop_show,setPopShow] = useState<boolean>(false)
      const [warn_text,setWarnText] = useState<string>('')
      const [info_show,setInfoShow] = useState<boolean>(false)
   const handleSend = ()=>{
      if(checkEmpty([name,time,time_n,address]) || checkEmpty([name,time,time_n,address])===0){
         sendInfo(checkEmpty([name,time,time_n,address]))
      }else {
         // 非空验证成功
         Taro.reLaunch({url:'/pages/first/index?isFrist=true'})
      }
      
   }
   const sendInfo = (e)=>{
         switch (e) {
            case 0:
               setWarnText('姓名不能为空')
               break;
            case 1:
               setWarnText('阳历生日不能为空')
               break;
            case 2:
               setWarnText('阴历生日不能为空')
               break;
            case 3:
               setWarnText('籍贯不能为空')
               break;
            default:
               break;
         }
         setInfoShow(true)
   }
   return (<View className={style.username_box} >
      <PopInfo title={warn_text} show={info_show} setShow={setInfoShow} />
         <PopUp show={pop_show} setShow={setPopShow} title={'邀请码不存在,请重新输入'} />
         <View className={style.name_ipt_item}>
            <View className={style.name_item_lebal}>姓名</View>
            <Input className={style.name_item_text} value={name} onInput={(e)=>setName(e.detail.value)} />
         </View>
         <View className={style.name_ipt_item}>
            <View className={style.name_item_lebal}>阳历生日</View>
            <Picker mode='date' className={style.name_item_text} value={time} onChange={(e)=>setTime(e.detail.value)}>
                 <View >{time===''?'请选择日期':time}</View>
            </Picker>
         </View>
         <View className={style.name_ipt_item}>
            <View className={style.name_item_lebal}>阴历生日</View>
            <Input className={style.name_item_text} value={time_n} onInput={(e)=>setTimeN(e.detail.value)} />
         </View>
         <View className={style.name_ipt_item}>
            <View className={style.name_item_lebal}>籍贯</View>
            <Input className={style.name_item_text} value={address} onInput={(e)=>setAddress(e.detail.value)} />
         </View>
         <View className={style.bottom_btn_box}>
         <Button className={style.bottom_btn} onClick={handleSend}>提交</Button>
         </View>
   </View>)
  }