import React, { useState,useEffect } from 'react'
import {
View,
Image,
Button,
Input
} from '@tarojs/components'
import PopUp from '@/components/Pop-ups/text'
import style from './index.module.less'
import CheckEmpty from '@/components/empty'
import OrderList from './components/order_list'
import {Ilist} from './type'
import TabBar from '@/components/custom-tab-bar/index'
import {search_icon} from '@/assets/model'
export default ()=>{
   const [list,setList] = useState<Array<Ilist>>([])
   const [isSearch,setSearch] = useState<boolean>(false)
   const cancelSearch = ()=>{

   }
   const handleSearch = ()=>{

   }
   return (<View className={style.box} >
           <View className={style.search_top}>
               <View className={style.search_box}>
                  <Image src={search_icon} className={style.top_search_icon} />
                  <Input placeholder='搜索业主姓名/业主点话/业主地址' className={style.top_search_ipt} />
               </View>
               <View className={style.search_cancel} onClick={cancelSearch}>取消</View>
           </View>
           <View className={style.main}>
           <CheckEmpty isShow={list.length>0} empty_ele={<Empty isText={isSearch} />}>
                <OrderList list={list} />
           </CheckEmpty>
           </View>
   </View>)
  }
const Empty = ({isText}:{isText:boolean})=>{
     return <>
     {
        isText?(<View className={style.search_empty_box}>
         <View style={{marginTop:'12px'}}>没有搜索到相关订单，换个关键词试试吧~</View>
       </View>):''
     }
     </>
}