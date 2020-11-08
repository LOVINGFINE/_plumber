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
           name:'台灯台灯台灯台灯台灯台灯台灯台灯台灯台灯台灯台灯台灯台灯台灯台灯',
           type_name:'台灯',
           id:'dsasd2ad222',
           num:3232
        },
        {
           name:'台灯台灯台灯台灯台灯台灯台',
           id:'dsasd2222',
           type_name:'台灯',
           num:3232
        },
        {
           name:'台灯台灯台灯台灯',
           id:'dsasd2ds2222',
           type_name:'台灯',
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
         <View style={{padding:'20px 15px',boxSizing:'border-box',backgroundColor:'#fff',marginBottom:'10px'}}>
            <View className={style.detail_title}>业主信息</View>
            <View className={style.name_ipt_item}>
               <View className={style.name_item_lebal}>业主姓名:</View>
               <View  className={style.name_item_text}>{order_data.custom_name}</View>
               
            </View>
            <View className={style.name_ipt_item}>
               <View className={style.name_item_lebal}>业主电话:</View>
               <View  className={style.name_item_text}>{order_data.custom_tel}</View>
            </View>
            <View className={style.name_ipt_item} style={{border:'none'}}>
               <View className={style.name_item_lebal} >业主地址:</View>
               <View  className={style.name_item_text}>{order_data.custom_address}</View>
            </View>
         </View>
         <View style={{padding:'20px 15px',boxSizing:'border-box',backgroundColor:'#fff',marginBottom:'10px'}}>
            <View className={style.detail_title}>安装信息</View>
            <View className={style.name_pro_item}>
               <View className={style.name_pro_lebal}>商品名称</View>
               <View  className={style.name_pro_content}>
                   {
                       order_data.pro_list.map((ele=>{
                           return <View className={style.pro_list_item} key={ele.id}>
                               <View className={style.pro_list_item_title}>{ele.name}</View>
                               <View className={style.pro_list_item_dec}>
                                   <View style={{marginRight:'6px'}}>ID: {ele.id}</View>
                                   <View>贡献分: {ele.num}</View>
                                </View>
                           </View>
                       }))
                   }
               </View>
            </View>
            <View className={style.name_ipt_item}>
               <View className={style.name_item_lebal}>商品总贡献分</View>
               <View  className={style.name_item_text}>{total_num}</View>
            </View>
            <View className={style.name_ipt_item} style={{border:'none'}}>
               <View className={style.name_item_lebal}>安装水电工</View>
               <View  className={style.name_item_text} style={{color:'#1F8EFF'}}>{order_data.plumper_name + ' ' + order_data.plumper_phone}</View>
            </View>
         </View>
         <View style={{padding:'20px 15px',boxSizing:'border-box',backgroundColor:'#fff',marginBottom:'10px'}}>
            <View className={style.detail_title}>订单信息</View>
            <View className={style.name_ipt_item} style={{border:'none'}}>
               <View className={style.name_item_lebal}>生成时间</View>
               <View  className={style.name_item_text}>{order_data.createTime}</View>
               
            </View>
         </View>
   </View>)
}