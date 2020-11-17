import React, { Component,useState,useEffect } from 'react'
import {
View,
Image,
ScrollView
} from '@tarojs/components'
import ComList from './components/comList'
import CheckEmpty from '@/components/empty'
import style from './index.module.less'
import {filterTime} from '@/utils/filter'
import { com_bg,warning} from '@/assets/model'
import {Clist} from './type'
import {getComList,getComTop} from '@/models/commission'

/**
 * @interface Cllist
 * 记录字段 类型
 */
export default ()=>{
  filterTime(1398250549490)
   const [user_data,setData] = useState<{total:number,visable:number}>({
        total:0,
        visable:0
   })
   const [list,setList] = useState<Array<Clist>>([])
   const [page,setPage] = useState<number>(1)
   const [refresh,setRefresh] = useState<boolean>(false)
   const [more,setMore] = useState<boolean>(false)
   useEffect(()=>{
    getComTop().then(res=>{
      let {leftTotal,reflectTotal} = res.data
      setData({
        total:leftTotal,
        visable:reflectTotal
      })
    })
   },[])
   useEffect(()=>{
    // getComList
   },[])
   const onPageChange = (p:number)=>{
       setPage(p)
       setTimeout(()=>{
         setRefresh(false)
         setMore(false)
       },3000)
   }
   return (<View className={style.box}>
        <View className={style.top}>
           <View className={style.top_box}>
             <View className={style.top_message}>
               <View className={style.message_item}>
                  <View className={style.message_text}>提现总金额</View>
                  <View className={style.message_number}>￥ {user_data.total}</View>   
               </View>
               <View className={style.message_item}>
                  <View className={style.message_text}>可提现余额</View>
                  <View className={style.message_number}>￥ {user_data.visable}</View>   
               </View>   
             </View>
             <Image className={style.top_bgImg} src={com_bg} />
           </View>
        </View>
        <View>
         <ScrollView
         refresherEnabled
         refresherTriggered={refresh}
         refresherBackground="#F8F8F8"
         refresherThreshold={60}
         lowerThreshold={10}
         onRefresherRefresh={()=>{
           setRefresh(true)
           onPageChange(1)
         }}
         onScrollToLower={()=>{
           setMore(true)
           onPageChange(page+1)
         }}
         scrollY className={style.main}>
         <CheckEmpty isShow={list.length>0} empty_ele={<Empty />}>
           <ComList time={'2020年9月'} list={list} />
           </CheckEmpty>
           <View className={style.load_more}>
               {
                 more?'加载更多...':''
               }
             </View>
         </ScrollView>
         
        </View>
   </View>)
  }
  const Empty = ()=>{
    return <View className={style.empty_box}>
         <Image src={warning} className={style.empty_img} />
         <View style={{marginTop:'12px'}}>暂无提现记录</View>
    </View>
}