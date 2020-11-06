import React, { useState,useEffect } from 'react'
import Taro from '@tarojs/taro'
import {
View,
Image,
Button,
ScrollView
} from '@tarojs/components'
import PopUp from '@/components/Pop-ups/text'
import style from './index.module.less'
import CheckEmpty from '@/components/empty'
import OrderList from './components/order_list'
import {Ilist} from './type'
import TabBar from '@/components/custom-tab-bar/index'
import {search_icon,warning,order_bg} from '@/assets/model'
export default ()=>{
   const [list,setList] = useState<Array<Ilist>>([
        {
             id:45,
             name: '张大宝',
             phone: '12222222',
             address: '上海市 徐汇区 xx路 xx号',
             pros: [{
                 name: '吊灯',
                 id: '4453545354'
               },
               {
                 name: '吊灯',
                 id: '4453545354'
               },
               {
                 name: '吊灯',
                 id: '4453545354'
               }, {
                 name: '吊灯',
                 id: '4453545354'
               }
             ],
             pro_points: 1344,
             installTime: '2020-10-09 12:34:89',
        },
        {
          id:46,
          name: '张大宝',
          phone: '12222222',
          address: '上海市 徐汇区 xx路 xx号',
          pros: [{
              name: '吊灯',
              id: '4453545354'
            },
            {
              name: '吊灯',
              id: '4453545354'
            },
            {
              name: '吊灯',
              id: '4453545354'
            }, {
              name: '吊灯',
              id: '4453545354'
            }
          ],
          pro_points: 1344,
          installTime: '2020-10-09 12:34:89',
     },
     {
          id:48,
          name: '张大宝',
          phone: '12222222',
          address: '上海市 徐汇区 xx路 xx号',
          pros: [{
              name: '吊灯',
              id: '4453545354'
            },
            {
              name: '吊灯',
              id: '4453545354'
            },
            {
              name: '吊灯',
              id: '4453545354'
            }, {
              name: '吊灯',
              id: '4453545354'
            }
          ],
          pro_points: 1344,
          installTime: '2020-10-09 12:34:89',
     }
   ])
   return (<View className={style.box} >
           <View className={style.top}>
               <View className={style.top_search} onClick={()=>Taro.navigateTo({url:'/pages/tabPage/order/search'})}>
                  <Image src={search_icon} className={style.top_search_icon} />
                  搜索业主姓名/业主点话/业主地址
               </View>
               <Button className={style.order_add} onClick={()=>Taro.navigateTo({url:'/pages/product/index'})}>+安装产品</Button>
           </View>
           <ScrollView scrollY className={style.main}>
             <View style={{padding:'0 15px',width:'100%',boxSizing:'border-box',marginTop:'15px'}}>
             <CheckEmpty isShow={list.length>0} empty_ele={<Empty />}>
              <OrderList list={list} />
             </CheckEmpty>
             </View>
           </ScrollView>
   </View>)
  }
const Empty = ()=>{
     return <View className={style.empty_box}>
          <Image src={warning} className={style.empty_img} />
          <View style={{marginTop:'12px'}}>暂无订单</View>
     </View>
}