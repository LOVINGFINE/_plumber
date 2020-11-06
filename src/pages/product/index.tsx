import React, { Component,useState,useEffect } from 'react'
import Taro from '@tarojs/taro'
import {
View,
Input,
Button
} from '@tarojs/components'
import PopInfo from '@/components/Pop-ups/info'
import PopModal from '@/components/Pop-ups/modal'
import style from './style.module.less'
export default ()=>{
   const [info_show,setInfo] = useState<boolean>(false)
   const [modal_show,setModal] = useState<boolean>(false)

   const [isPost,setIsPost] = useState<boolean>(false)
   const [steps,setSteps] =  useState<number>(0)
   const findCodeView = ()=>{
      Taro.scanCode({
         onlyFromCamera:true,
      }).then((res:any)=>{
          // 扫码成功
      }).catch(()=>{
         // 扫码失败
      })
   }
   const postDataSteps = ()=>{
      // 提交数据
      if(steps===0){

      }
   }
   const deletePro =()=>{
      // 删除商品
   }
   return (<View className={style.box} >
        <PopInfo show={info_show} setShow={setInfo} btn_text='我知道了' title='凭证码错误请重新 输入凭证码' time={10} />
        <PopModal 
        title='确认删除该商品吗？'
        show={modal_show} 
        handleCancel={()=>setModal(false)} 
        handleOk={()=>deletePro()} />
         {
            steps===0?(<>
            <View className={style.name_ipt_item}>
            <View className={style.name_item_lebal}>凭证码</View>
            <Input className={style.name_item_text} placeholder='请输入凭证码' />
            </View>
            <View className={style.name_ipt_item}>
               <View className={style.name_item_lebal}>贡献分收入手机号</View>
               <Input className={style.name_item_text} placeholder='贡献分收入手机号' />
            </View>
            </>):(<>
            <View className={style.name_ipt_item}>
            <View className={style.name_item_lebal}>凭证码</View>
            <Input className={style.name_item_text} placeholder='请输入凭证码' />
            </View>
            <View className={style.name_ipt_item}>
               <View className={style.name_item_lebal}>业主姓名</View>
               <Input className={style.name_item_text} placeholder='请输入业主姓名' />
            </View>
            <View className={style.name_ipt_item}>
               <View className={style.name_item_lebal}>业主手机号</View>
               <Input className={style.name_item_text} placeholder='请输入业主手机号' />
            </View>
            <View className={style.name_ipt_item}>
               <View className={style.name_item_lebal}>业主地址</View>
               <Input className={style.name_item_text} placeholder='请输入业主地址' />
            </View>
            <View className={style.name_ipt_item} style={{border:'none'}}>
               <View className={style.name_item_lebal}>安装产品</View>
               <View />
            </View>
            <View className={style.pro_btn_box}>
               <Button className={style.pro_btn} onClick={()=>findCodeView()}>+添加</Button>
            </View>
               </>)
         }
         <View className={style.bottom_btn_box} >
            <Button className={style.bottom_btn} style={isPost?{}:{
               backgroundColor:'#003aa56e',
               boxShadow:'2px 2px 2px  #003aa531'
            }} onClick={postDataSteps}>提交</Button>
         </View>
   </View>)
}