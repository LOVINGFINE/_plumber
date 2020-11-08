import React, { Component,useState,useEffect } from 'react'
import Taro from '@tarojs/taro'
import ChangeIpt from './components/changeIpt'
import {
View,
Input
} from '@tarojs/components'
import style from './index.module.less'
import PopUp from '@/components/Pop-ups/text'
export default ()=>{
      const [name,setName] = useState<string>('1号网点上海市徐汇区')
      const [pop_show,setPopShow] = useState<boolean>(false)
      const [info_text,setInfoText] = useState<string>('')
   const handleSend = ()=>{
      Taro.navigateBack({delta:1})
      
   }
   return (<View className={style.username_box} >
         <PopUp show={pop_show} setShow={setPopShow} title={info_text} />
         <ChangeIpt  handleOk={handleSend} >
         <View className={style.name_ipt_item}>
          <View className={style.name_item_lebal}>账号昵称</View>
          <Input className={style.name_item_text} value={name} onInput={(e)=>setName(e.detail.value)} />
         </View>
         </ChangeIpt>
   </View>)
  }