import React from 'react'
import {
View,
Image
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import style from '../index.module.less'
import {Ilist} from '../type'
import {order_bg} from '@/assets/model'
import {filterTime} from '@/utils/filter'
export default ({list}:{list:Array<Ilist>})=>{
   const goDetail = (id)=>{
       Taro.navigateTo({url:'/pages/tabPage/order/detail?id='+id})
   }
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
                       <View className={style.item_message_text}>{ele.goodsList.length>0?`${ele.goodsList[0].name.slice(0,8)}${ele.goodsList[0].name.length>8?'...':''} ID${ele.goodsList[0].code.slice(0,6)}${ele.goodsList[0].code.length>6?'...':''} ${ele.goodsList.length>1?`等${ele.goodsList.length}件商品`:''}`:'暂无信息'}</View>
                    </View>
                    <View className={style.item_message}>
                       <View className={style.item_message_lebal}>订单佣金</View>
                       <View className={style.item_message_text}>{ele.money/100}</View>
                    </View>
                    <View className={style.item_message}>
                       <View className={style.item_message_lebal}>安装时间</View>
                       <View className={style.item_message_text}>{ele.orderUpdateTime?filterTime(ele.orderUpdateTime):'暂未安装'}</View>
                    </View>
                 </View>
                <Image src={order_bg} className={style.order_bg} />
                </View>
                <View className={style.item_bottom}>
                     <View className={style.item_bottom_btn} onClick={()=>goDetail(ele.id)}>查看详情</View>
                </View>
          </View>
     })
}</>)
}