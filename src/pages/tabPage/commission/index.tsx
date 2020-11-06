import React, { Component,useState,useEffect } from 'react'
import {
View,
Image,
ScrollView
} from '@tarojs/components'
import ComList from './components/comList'
import TabBar from '@/components/custom-tab-bar/index'
import style from './index.module.less'
import { com_bg} from '@/assets/model'
import {Clist} from './type'
/**
 * @interface Cllist
 */
export default ()=>{
   const [user_data,setData] = useState<{total:number,visable:number}>({
        total:12345,
        visable:12345
   })
   const [list,setList] = useState<Array<Clist>>([
        {
          id:'142424',
          createTime:'2020-9-18 20:20',
          address:'上海市徐汇区12号网点',
          bossName:'张大炮',
          num:800
        },
        {
          id:'142424',
          createTime:'2020-9-18 20:20',
          address:'上海市徐汇区12号网点',
          bossName:'张大炮',
          num:800

        },
        {
          id:'142324',
          createTime:'2020-9-18 20:20',
          address:'上海市徐汇区12号网点',
          bossName:'张大炮',
          num:800

        },
        {
          id:'1442324',
          createTime:'2020-9-18 20:20',
          address:'上海市徐汇区12号网点',
          bossName:'张大炮',
          num:800

        },
        {
          id:'1443924',
          createTime:'2020-9-18 20:20',
          address:'上海市徐汇区12号网点',
          bossName:'张大炮',
          num:800

        },
        {
          id:'1424342',
          createTime:'2020-9-18 20:20',
          address:'上海市徐汇区12号网点',
          bossName:'张大炮',
          num:800

        },
   ])
   return (<View className={style.box}>
        <View className={style.top}>
           <View className={style.top_box}>
             <View className={style.top_message}>
               <View className={style.message_item}>
                  <View className={style.message_text}>提现总贡献分</View>
                  <View className={style.message_number}>{user_data.total}</View>   
               </View>
               <View className={style.message_item}>
                  <View className={style.message_text}>可提现贡献分</View>
                  <View className={style.message_number}>{user_data.visable}</View>   
               </View>   
             </View>
             <Image className={style.top_bgImg} src={com_bg} />
           </View>
        </View>
        <View>
         <ScrollView scrollY className={style.main}>
           <ComList time={'2020年9月'} list={list} />
         </ScrollView>
        </View>
   </View>)
  }