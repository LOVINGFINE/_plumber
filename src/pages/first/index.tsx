import React, { Component,useState,useEffect } from 'react'
import {
View,
} from '@tarojs/components'
import Taro,{getCurrentInstance } from '@tarojs/taro'
import PopText from '@/components/Pop-ups/text'
import Order from '../tabPage/order/index'
import ComPage from '../tabPage/commission/index'
import MyHome from '../tabPage/myhome/index'
import TabBar from '@/components/custom-tab-bar/index'
import NavBar from '@/components/nav-bar/index'
import style from './index.module.less'
import PageLayout from '../../layout/pageLayout'
export default ()=>{
      const [current,setCurrent] = useState<number>(0)
      const [text_show,setShow] = useState<boolean>(false)
      const [show_title,setTitle] = useState<string>('')
      useEffect(()=>{
        if(getCurrentInstance().router.params.isFrist){
          handleTextInfo('注册成功')
        }
        if(getCurrentInstance().router.params.login){
          setCurrent(2)
        }
      },[])
      const handleTextInfo = (text:string)=>{
        setTitle(text)
        setShow(true)
      }

      const checkToken = (fun:()=>void,e?:()=>void)=>{
          let t = Taro.getStorageSync('token') || ''
          if(t!=''){
            fun()
          }else {
            handleTextInfo('请前往“我的”登录')
            if(e){
              e()
            }
          }
      }
   return (<View className={style.box}>
     <PopText title={show_title} show={text_show} setShow={setShow} />
     <View style={{width:'100%',height:'100%',display:current!=0?'none':'',overflow: "hidden"}}>
          <Order checkToken={(f,e)=>checkToken(f)} />
     </View>
     <View style={{width:'100%',height:'100%',display:current!=1?'none':'',overflow: "hidden"}}>
         <ComPage checkToken={(f,e)=>checkToken(f,e)} />
     </View>
     <View style={{width:'100%',height:'100%',display:current!=2?'none':'',overflow: "hidden"}}>
       <MyHome checkToken={checkToken} />
     </View>
     <TabBar current={current} setCurrent={setCurrent} />
   </View>)
}
