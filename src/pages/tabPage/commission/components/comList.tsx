import React from 'react'
import {
View,
Text
} from '@tarojs/components'
import style from '../index.module.less'

import { Clist } from '../type'
export default ({
    time,
    list
}:{time:string,list:Array<Clist>})=>{
   
   return <>
        <View className={style.list_title}>{time}  提现记录</View>
        <View style={{width:'100%',padding:'6px 15px 0',boxSizing:'border-box'}}>
        {
            list.map((ele:Clist)=>{
                return <View key={ele.id} className={style.com_item}>
                    <View className={style.com_item_time}>
                       <Text>{ele.createTime}</Text>
                       <Text style={{fontSize:'20px'}}>{ele.num}</Text>
                    </View>
                    <View className={style.com_item_text}>{ele.address}</View>
                    <View className={style.com_item_text}>老板姓名:  {ele.bossName}</View>
                </View>
            })
        }
        </View>
   </>
  }