import React, { useState,useEffect } from 'react'
import {
View,
Image,
Button
} from '@tarojs/components'
import style from '../index.module.less'
import {Ilist,Il} from '../type'
import {order_bg} from '@/assets/model'
export default ({list}:Il)=>{
   return (<>
   {
     list.map((ele:Ilist)=>{
          return <View key={ele.id} className={style.item}>
                <View style={{position:'relative'}}>
                <View className={style.item_main}>
                    <View className={style.item_message}>
                       <View className={style.item_message_lebal}>业主姓名</View>
                       <View className={style.item_message_text}>{ele.name}</View>
                    </View>
                    <View className={style.item_message}>
                       <View className={style.item_message_lebal}>业主电话</View>
                       <View className={style.item_message_text}>{ele.phone}</View>
                    </View>
                    <View className={style.item_message}>
                       <View className={style.item_message_lebal}>业主地址</View>
                       <View className={style.item_message_text}>{ele.address}</View>
                    </View>
                    <View className={style.item_message}>
                       <View className={style.item_message_lebal}>安装商品</View>
                       <View className={style.item_message_text}>{ele.pros.length>0?`${ele.pros[0].name} ID${ele.pros[0].id}...等${ele.pros.length}件商品`:'暂无信息'}</View>
                    </View>
                    <View className={style.item_message}>
                       <View className={style.item_message_lebal}>商品贡献分</View>
                       <View className={style.item_message_text}>{ele.pro_points}</View>
                    </View>
                    <View className={style.item_message}>
                       <View className={style.item_message_lebal}>安装时间</View>
                       <View className={style.item_message_text}>{ele.installTime}</View>
                    </View>
                 </View>
                <Image src={order_bg} className={style.order_bg} />
                </View>
                <View className={style.item_bottom}>
                     <View className={style.item_bottom_btn}>查看详情</View>
                </View>
          </View>
     })
}</>)
}