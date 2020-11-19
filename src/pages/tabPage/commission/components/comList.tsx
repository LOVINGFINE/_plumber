import React, { useEffect, useState } from 'react'
import {
View,
Text
} from '@tarojs/components'
import style from '../index.module.less'
import {filterTime,filterMouth} from '@/utils/filter'
import { Clist } from '../type'
interface tL {
    title:string,
    list:Array<Clist>
}
export default ({
    list
}:{list:Array<Clist>})=>{
    const [type_list,setTypeList] = useState<Array<tL>>([] as any)
   useEffect(()=>{
     setTypeList(handleList(list))
   },[list])
   const handleList =(list:Array<Clist>):Array<tL>=>{
       let l = list
       l.sort((a,b)=>b.reflectTime-a.reflectTime)
      let newList:Array<tL> = [] as Array<tL>      
       l.map(ele=>{
           return {
               ...ele,
               title:filterMouth(ele.reflectTime)
           }
       }).forEach(item=>{
           let i = newList.findIndex(e=>e.title===item.title)
           if(i===-1){
               newList.push({
                   title:item.title,
                   list:[{
                    money:item.money,
                    outletsAddress:item.outletsAddress,
                    outletsId:item.outletsId,
                    outletsName:item.outletsName,
                    reflectTime:item.reflectTime,
                   }]
               })
           }else {
               newList[i].list.push({
                money:item.money,
                outletsAddress:item.outletsAddress,
                outletsId:item.outletsId,
                outletsName:item.outletsName,
                reflectTime:item.reflectTime,
               })
           }
       })
      
       return  newList
   }
   return <>
       { type_list.map((item:tL)=>{
            return <>
            <View className={style.list_title}>{item.title}  提现记录</View>
            <View style={{width:'100%',padding:'6px 15px 0',boxSizing:'border-box'}}>
            {
                item.list.map((ele:Clist)=>{
                    return <View key={ele.reflectTime} className={style.com_item}>
                        <View className={style.com_item_time}>
                           <Text>{filterTime(ele.reflectTime)}</Text>
                           <Text style={{fontSize:'20px'}}>{ele.money/100}</Text>
                        </View>
                        <View className={style.com_item_text}>{ele.outletsAddress}</View>
                        <View className={style.com_item_text}>老板姓名:  {ele.outletsName}</View>
                    </View>
                })
            }
            </View>
            </>
        })}
   </>
  }