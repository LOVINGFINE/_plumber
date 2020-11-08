import React, { Component,useState,useEffect } from 'react'
import {
View,
} from '@tarojs/components'
import PopText from '@/components/Pop-ups/text'
import Order from '../tabPage/order/index'
import ComPage from '../tabPage/commission/index'
import MyHome from '../tabPage/myhome/index'
import TabBar from '@/components/custom-tab-bar/index'
import style from './index.module.less'
export default ()=>{
      const [current,setCurrent] = useState<number>(0)
      const [text_show,setShow] = useState<boolean>(false)
      useEffect(()=>{
        // 
      },[])
   return (<View className={style.box} >
       <PopText title={'输入成功'} show={text_show} setShow={setShow} />
         <ShowPage current={current} />
         <TabBar current={current} setCurrent={setCurrent} />
   </View>)
}

const ShowPage = ({current}:{current:number})=>{
    switch(current){
        case 0:
           return <Order />  
        case 1:
         return <ComPage />  
        case 2:
         return <MyHome />  
        default:
            return <View></View>
    }
}
