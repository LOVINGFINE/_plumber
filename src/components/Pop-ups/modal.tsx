import React,{useEffect, useState} from 'react'
interface Iprops {
    title:string
    show:boolean
    handleOk:()=>void
    handleCancel:()=>void
    cancel_text?:string
    ok_text?:string
}
import style from './index.module.less'
import {
    View,
    
    } from '@tarojs/components'
export default (
    {
        title,
        show,
        handleOk,
        handleCancel,
        cancel_text,
        ok_text
    }:Iprops
)=>{
    return <>
       {
           show?(
            <View className={style.box_modal}>
                <View className={style.modal_show}>
                    <View className={style.modal_text}>
                        {title}
                    </View>
                 <View className={style.modal_btn}>
                 <View className={style.cancel_btn} onClick={()=>handleCancel()}>{cancel_text?cancel_text:'取消'}</View>
                 <View className={style.line} />
                 <View className={style.ok_btn} onClick={()=>handleCancel()}>{ok_text?ok_text:'确认'}</View>
                 </View>
                </View>
            </View>
           ):('')
       }
    </>
}