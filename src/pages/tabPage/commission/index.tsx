import React, { Component,useState,useEffect } from 'react'
import {
View,
Image,
ScrollView
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import ComList from './components/comList'
import CheckEmpty from '@/components/empty'
import style from './index.module.less'
import { com_bg,warning} from '@/assets/model'
import {Clist} from './type'
import {getComList,getComTop} from '@/models/commission'
import InfoText from '@/components/Pop-ups/text'
/**
 * @interface Cllist
 * 记录字段 类型
 */
export default ({
  checkToken
}:{
  checkToken:(fun:()=>void,e?:()=>void)=>void
})=>{
   const [user_data,setData] = useState<{total:number,visable:number}>({
        total:0,
        visable:0
   })
   const [info_show,setInfo] = useState<boolean>(false)
   const [info_text,setInfoText] = useState<string>('')
   const [list,setList] = useState<Array<Clist>>([])
   const [page,setPage] = useState<number>(1)
   const [refresh,setRefresh] = useState<boolean>(false)
   const [more,setMore] = useState<boolean>(false)
   useEffect(()=>{
    onPageChange(page)
    getComTop().then(res=>{
      if(res.code===200){
        let {
          leftTotal,
          reflectTotal
        } = res.data
        setData({
          total: reflectTotal,
          visable: leftTotal
        })
      }
    })
   },[])
   const onPageChange = (p:number)=>{
       setPage(p)
       getComList(p).then(res=>{
        setMore(false)
        setRefresh(false)
         let {code,data,message} = res
         if(code===200){
          if(p===1){
            setList(data)
           }else {
             let l = list.concat(data)
              setList(l)
           }
         }
      })
   }
   const setInfoBox = (text:string)=>{
    setInfoText(text)
    setInfo(true)
}
const tokenIsEmpty = ()=>{
  let a = Taro.getStorageSync('token') || ''
  return a===''
}
   return (<View className={style.box}>
     <InfoText title={info_text} show={info_show} setShow={setInfo} />
        <View className={style.top}>
           <View className={style.top_box}>
             <View className={style.top_message}>
               <View className={style.message_item}>
                  <View className={style.message_text}>提现总金额</View>
                  <View className={style.message_number}>{user_data.total/100}</View>   
               </View>
               <View className={style.message_item}>
                  <View className={style.message_text}>可提现余额</View>
                  <View className={style.message_number}>{user_data.visable/100}</View>   
               </View>   
             </View>
             <Image className={style.top_bgImg} src={com_bg} />
           </View>
        </View>
        <View>
         <ScrollView
         refresherEnabled={!tokenIsEmpty()}
         refresherTriggered={refresh}
         refresherBackground="#F8F8F8"
         refresherThreshold={60}
         lowerThreshold={0}
         onRefresherRefresh={()=>{setRefresh(true)
          onPageChange(1)}}
         onScrollToLower={()=>{
          if(list.length>0){
            setMore(true);
            onPageChange(page + 1);
          }
         }}
         scrollY className={style.main}>
         <CheckEmpty isShow={list.length>0} empty_ele={<Empty />}>
           <ComList list={list} />
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