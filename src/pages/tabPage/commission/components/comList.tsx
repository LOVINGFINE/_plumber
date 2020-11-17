import React from 'react'
import {
View,
Text
} from '@tarojs/components'
import style from '../index.module.less'
import {filterTime} from '@/utils/filter'
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
                return <View key={ele.reflectTime} className={style.com_item}>
                    <View className={style.com_item_time}>
                       <Text>{filterTime(ele.reflectTime)}</Text>
                       <Text style={{fontSize:'20px'}}>{ele.money}</Text>
                    </View>
                    <View className={style.com_item_text}>{ele.outletsAddress}</View>
                    <View className={style.com_item_text}>老板姓名:  {ele.outletsName}</View>
                </View>
            })
        }
        </View>
   </>
  }