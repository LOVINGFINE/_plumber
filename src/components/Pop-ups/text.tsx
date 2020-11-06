import React,{useEffect, useState} from 'react'
interface Iprops {
    title:string
    show:boolean
    setShow:(e:boolean)=>void
    time?:number
}
import style from './index.module.less'
import {
    View,
    
    } from '@tarojs/components'
export default (
    {title,time,show,setShow}:Iprops
)=>{
    useEffect(()=>{
        setTimeout(()=>{
            setShow(false)
        },time*1000 || 3000)
    },[show])
    return <>
       {
           show?(
            <View className={style.box_text}>
                <View className={style.title_box}>{title}</View>
            </View>
           ):('')
       }
    </>
}