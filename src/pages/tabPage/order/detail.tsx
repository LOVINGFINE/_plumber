import React, { Component,useState,useEffect } from 'react'
import Taro from '@tarojs/taro'
import {
View,
} from '@tarojs/components'
import style from './index.module.less'
export default ()=>{
   
   const [total_num,setTotal] = useState<number>(0)
  /**
   * 表单数据
   */
  const [order_data,setOrderData] = useState<any>({
    custom_name:'张潇潇',
    custom_tel:'15111110000',
    custom_address:'上海市 徐汇区 xx路 xx号',
    pro_list:[
        {
           name:'台灯',
           type_name:'台灯',
           id:'76731547',
           num:3232
        },
        {
           name:'吸顶灯',
           id:'84675357',
           type_name:'吸顶灯',
           num:3232
        },
        {
           name:'LED灯',
           id:'84675350',
           type_name:'LED灯',
           num:3232
        }
     ],
    plumper_name:'张水电',
    plumper_phone:'15111112222',
    createTime:'2020-10-12 12:31:21'
  })
   useEffect(()=>{
      let n = 0
      order_data.pro_list.forEach(ele=>{
         n+=ele.num
      })
      setTotal(n)
   },[])
  
   return (<View className={style.box} >
         <View style={{padding:'20px 15px 0 15px',boxSizing:'border-box',backgroundColor:'#fff',marginBottom:'10px'}}>
            <View className={style.detail_title}>业主信息</View>
            <View className={style.name_ipt_item} style={{border:'none'}}>
               <View className={style.name_item_lebal}>业主姓名:</View>
               <View  className={style.name_item_text}>{order_data.custom_name}</View>
               
            </View>
            <View className={style.name_ipt_item} style={{border:'none'}}>
               <View className={style.name_item_lebal}>业主电话:</View>
               <View  className={style.name_item_text}>{order_data.custom_tel}</View>
            </View>
            <View className={style.name_ipt_item} style={{border:'none'}}>
               <View className={style.name_item_lebal} >业主地址:</View>
               <View  className={style.name_item_text}>{order_data.custom_address}</View>
            </View>
         </View>
         <View style={{padding:'20px 15px 0 15px',boxSizing:'border-box',backgroundColor:'#fff',marginBottom:'10px'}}>
            <View className={style.detail_title}>安装信息</View>
            <View className={style.name_pro_item}>
               <View className={style.name_pro_lebal}>安装商品:</View>
               <View  className={style.name_pro_content}>
                   {
                       order_data.pro_list.map((ele=>{
                           return <View className={style.pro_list_item} key={ele.id}>
                               <View className={style.pro_list_item_title}>{ele.name}</View>
                               <View className={style.pro_list_item_dec}>
                                   <View style={{marginRight:'6px'}}>ID:{ele.id}</View>
                                   <View>￥ {ele.num}</View>
                                </View>
                           </View>
                       }))
                   }
               </View>
            </View>
            <View className={style.name_ipt_item} style={{border:'none'}}>
               <View className={style.name_item_lebal}>商品总金额</View>
               <View  className={style.name_item_text} style={{paddingRight:'30px'}}>￥ {total_num}</View>
            </View>
         </View>
         <View style={{padding:'20px 15px',boxSizing:'border-box',backgroundColor:'#fff',marginBottom:'10px'}}>
            <View className={style.detail_title}>订单信息</View>
            <View className={style.name_ipt_item} style={{border:'none'}}>
               <View className={style.name_item_lebal}>安装时间</View>
               <View  className={style.name_item_text}>{order_data.createTime}</View>
               
            </View>
         </View>
   </View>)
}