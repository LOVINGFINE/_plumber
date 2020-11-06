import React, { useState,useEffect } from 'react'
import {
View,
Image,
Button,
Input
} from '@tarojs/components'
import PopUp from '@/components/Pop-ups/index'
import style from './index.module.less'
import CheckEmpty from '@/components/empty'
import {Ilist} from './type'
import TabBar from '@/components/custom-tab-bar/index'
import {search_icon,warning,order_bg} from '@/assets/model'
export default ()=>{
   const [list,setList] = useState<Array<Ilist>>([
        
   ])
   const cancelSearch = ()=>{

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
           <CheckEmpty isShow={list.length>0} empty_ele={<Empty />}>
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
                }
           </CheckEmpty>
           </View>
        <TabBar />
   </View>)
  }
const Empty = ()=>{
     return <View className={style.search_empty_box}>
          <View style={{marginTop:'12px'}}>没有搜索到相关订单，换个关键词试试吧~</View>
     </View>
}