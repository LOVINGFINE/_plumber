import React, { Component,useState,useEffect } from 'react'
import Taro,{getCurrentInstance} from '@tarojs/taro'
import {
View,
} from '@tarojs/components'
import style from './index.module.less'
import {getOrderDetail} from '@/models/order'
import {Ilist,TPro} from './type'
import {filterTime} from '@/utils/filter'
import CheckEmpty from "@/components/empty";
export default ()=>{
   
   const [total_num,setTotal] = useState<number>(0)
  /**
   * 表单数据
   */
  const [order_data,setOrderData] = useState<Ilist>({
   name:'',
   phone:'',
   address:'',
    goodsList:[
     ],
     hyName	:'',
     hyPhone:'',
     orderUpdateTime:0,
     orderCreateTime: 0,
	  outletsId: 0,
     outletsName: '',
     hyUserId:0,
    id: 0,
	 installStatus: 1,
	 money: 0
  })
   useEffect(()=>{
      let n = 0
      order_data.goodsList.forEach((ele:TPro)=>{
         n+=ele.pr*ele.ct
      })
      setTotal(n)
   },[])
  useEffect(()=>{
   getCurrentInstance().router.params.id || ""
  },[])
  const getData = (id:string)=>{
   getOrderDetail(id).then(res=>{
      let {data} = res
      setOrderData(data)
   })
  }
   return (<View className={style.box} >
         <View style={{padding:'20px 15px 0 15px',boxSizing:'border-box',backgroundColor:'#fff',marginBottom:'10px'}}>
            <View className={style.detail_title}>业主信息</View>
            <View className={style.name_ipt_item} style={{border:'none'}}>
               <View className={style.name_item_lebal}>业主姓名:</View>
               <View  className={style.name_item_text}>{order_data.name}</View>
               
            </View>
            <View className={style.name_ipt_item} style={{border:'none'}}>
               <View className={style.name_item_lebal}>业主电话:</View>
               <View  className={style.name_item_text}>{order_data.phone}</View>
            </View>
            <View className={style.name_ipt_item} style={{border:'none'}}>
               <View className={style.name_item_lebal} >业主地址:</View>
               <View  className={style.name_item_text}>{order_data.address}</View>
            </View>
         </View>
         <View style={{padding:'20px 15px 0 15px',boxSizing:'border-box',backgroundColor:'#fff',marginBottom:'10px'}}>
            <View className={style.detail_title}>安装信息</View>
            <View className={style.name_pro_item}>
               <View className={style.name_pro_lebal}>安装商品:</View>
               <View  className={style.name_pro_content}>
                   {
                       order_data.goodsList.map(((ele:TPro)=>{
                           return <View className={style.pro_list_item} key={ele.code}>
                               <View className={style.pro_list_item_title}>{ele.name}</View>
                               <View className={style.pro_list_item_dec}>
                                   <View style={{marginRight:'6px'}}>ID:{ele.code}</View>
                               <View>￥ {ele.pr} x {ele.ct}</View>
                                </View>
                           </View>
                       }))
                   }
               </View>
            </View>
            <View className={style.name_ipt_item} style={{border:'none'}}>
               <View className={style.name_item_lebal}>商品总金额</View>
               <View  className={style.name_item_text} style={{paddingRight:'30px'}}>￥ {order_data.money}</View>
            </View>
         </View>
         <View style={{padding:'20px 15px',boxSizing:'border-box',backgroundColor:'#fff',marginBottom:'10px'}}>
            <View className={style.detail_title}>订单信息</View>
            <View className={style.name_ipt_item} style={{border:'none'}}>
               <View className={style.name_item_lebal}>创建时间</View>
               <View  className={style.name_item_text}>{filterTime(order_data.orderCreateTime)}</View>
            </View>
            <CheckEmpty isShow={order_data.installStatus===1} empty_ele={<View/>}>
            <View className={style.name_ipt_item} style={{border:'none'}}>
               <View className={style.name_item_lebal}>安装时间</View>
               <View  className={style.name_item_text}>{filterTime(order_data.orderUpdateTime)}</View>
            </View>
            </CheckEmpty>
            
            <View className={style.name_ipt_item} style={{border:'none'}}>
               <View className={style.name_item_lebal}>安装状态</View>
               <View  className={style.name_item_text}>{order_data.installStatus===0?'待安装':'已安装'}</View>
            </View>
         </View>
   </View>)
}