import React, { Component,useState,useEffect } from 'react'
import {
View,
Button,
Input
} from '@tarojs/components'
import CodeIpt from './codeIpt'
import style from './index.module.less'
import PopUp from '@/components/Pop-ups/index'
export default ()=>{
      const [login_step,setLoginStep] = useState<number>(1)
      const [code,setCode] = useState<string>('')
      const [pop_show,setPopShow] = useState<boolean>(false)
   
   const handleSend = ()=>{
      

   }
   return (<View className={style.username_box} >
         <PopUp show={pop_show} setShow={setPopShow} title={'邀请码不存在,请重新输入'} />
         <View className={style.name_ipt_item}>
            <View className={style.name_item_lebal}>姓名</View>
            <Input className={style.name_item_text} />
         </View>
         <View className={style.name_ipt_item}>
            <View className={style.name_item_lebal}>阳历生日</View>
            <Input className={style.name_item_text} />
         </View>
         <View className={style.name_ipt_item}>
            <View className={style.name_item_lebal}>阴历生日</View>
            <Input className={style.name_item_text} />
         </View>
         <View className={style.name_ipt_item}>
            <View className={style.name_item_lebal}>籍贯</View>
            <Input className={style.name_item_text} />
         </View>
         <View className={style.bottom_btn_box}>
         <Button className={style.bottom_btn} onClick={handleSend}>提交</Button>
         </View>
   </View>)
  }