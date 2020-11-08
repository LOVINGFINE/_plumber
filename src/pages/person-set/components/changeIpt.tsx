import React, { Component,useState,useEffect } from 'react'
import {
View,
Button,
} from '@tarojs/components'
import style from '../index.module.less'
interface Iprops {
    handleOk:Function
    btn_text?:any,
    children:any
}
export default ({
    handleOk,
    btn_text,
    children
}:Iprops)=>{
      const [pop_show,setPopShow] = useState<boolean>(false)
   return (<View className={style.ipt_box} >
         {children}
         <View className={style.ipt_btn_box} style={{marginTop:'30px'}}>
            <Button className={style.ipt_btn} onClick={()=>handleOk()}>{btn_text?btn_text:'确认'}</Button>
         </View>
   </View>)
  }