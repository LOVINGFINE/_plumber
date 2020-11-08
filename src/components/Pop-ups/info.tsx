import React,{useEffect, useState} from 'react'
interface Iprops {
    title:string
    show:boolean
    setShow:(e:boolean)=>void
    time?:number,
    btn_text?:string
}
import style from './index.module.less'
import {
    View,
    
    } from '@tarojs/components'
export default (
    {title,time,show,setShow,btn_text}:Iprops
)=>{
    useEffect(()=>{
        if(show&&time){
            setTimeout(()=>{
                setShow(false)
            },time*1000)
        }
    },[show])
    return <>
       {
           show?(
            <View className={style.box_info}>
                <View className={style.info_show}>
                    <View className={style.info_text}>
                        {title}
                    </View>
                 <View className={style.info_btn} onClick={()=>setShow(false)}>{btn_text?btn_text:'我知道了'}</View>
                </View>
            </View>
           ):('')
       }
    </>
}