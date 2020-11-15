import React, { Component,useState,useEffect } from 'react'
import Taro from '@tarojs/taro'
import { AtIcon } from 'taro-ui'
import {
View,
Button,
Input,
Image
} from '@tarojs/components'
import style from './index.module.less'
import PopUp from '@/components/Pop-ups/text'
import {user_icon} from '@/assets/model'
import {Picker} from '@tarojs/components'
export default ()=>{
      const [name,setName] = useState<string>('1号网点上海市徐汇区')
      const [phone,setPhone] = useState<string>('1552220000')
      const [time,setTime] = useState<string>('1988-09-15')
      const [time_n,setTimeN] = useState<string>('十月初三')
      const [address,setAddress] = useState<string>('上海市 徐汇区')
      const [pop_show,setPopShow] = useState<boolean>(false)
      const [avator_url,setAvatorUrl] = useState<string>('')
   const handleSend = ()=>{
       
      Taro.navigateBack({delta:1})
   }
   const changeImage = ()=>{
      Taro.chooseImage({
         count:1,
         success:(res)=>{
            console.log(res);
            if(res.errMsg==='chooseImage:ok'){
               setAvatorUrl(res.tempFilePaths[0])
            }
         }
      })
   }
   const logoutUser = ()=>{
      Taro.setStorageSync('token','')
                    Taro.setStorageSync('user',{
                          name:'',
                          phone:''
                    })
                    Taro.reLaunch({url:'/pages/first/index'})  
   }
   return (<View className={style.username_box} >
         <PopUp show={pop_show} setShow={setPopShow} title={'邀请码不存在,请重新输入'} />
         <View style={{padding:'0 15px',boxSizing:'border-box',width:'100%',backgroundColor:'#fff'}}>
         <View className={style.name_ipt_item} style={{height:'80px'}}>
            <View className={style.name_item_lebal}>头像</View>
               <View style={{display:'flex',alignItems:'center',flex:'auto',justifyContent:'flex-end'}} onClick={()=>changeImage()}>
               <Image src={avator_url===''?user_icon:avator_url} className={style.avator_img} />
               <AtIcon value='chevron-right'  size='15' color='#A8A8A8' />
               </View>
         </View>
         <View className={style.name_ipt_item}>
            <View className={style.name_item_lebal}>账号昵称</View>
            <View style={{display:'flex',alignItems:'center',flex:'auto',justifyContent:'flex-end'}} onClick={()=>Taro.navigateTo({url:'/pages/person-set/name'})}>
            <View className={style.name_item_text}>{name}</View>
            <AtIcon value='chevron-right'  size='15' color='#A8A8A8' />
            </View>
         </View>
         <View className={style.name_ipt_item}>
            <View className={style.name_item_lebal}>绑定手机号</View>
            <View style={{display:'flex',alignItems:'center',flex:'auto',justifyContent:'flex-end'}} onClick={()=>Taro.navigateTo({url:'/pages/person-set/phone'})}>
            <View className={style.name_item_text}>{phone}</View>
            <AtIcon value='chevron-right'  size='15' color='#A8A8A8' />
            </View>
         </View>
         <View className={style.name_ipt_item}>
            <View className={style.name_item_lebal}>阳历生日</View>
            <Picker mode='date' className={style.name_item_text} value={time} onChange={(e)=>setTime(e.detail.value)}>
                 <View >{time===''?'请选择日期':time}</View>
            </Picker>
         </View>
         <View className={style.name_ipt_item}>
            <View className={style.name_item_lebal}>阴历生日</View>
            <Input className={style.name_item_text} value={time_n} />
         </View>
         <View className={style.name_ipt_item} style={{border:'none'}}>
            <View className={style.name_item_lebal}>籍贯</View>
            <View style={{display:'flex',alignItems:'center',flex:'auto',justifyContent:'flex-end'}}>
            <View className={style.name_item_text}>{address}</View>
            <AtIcon value='chevron-right'  size='15' color='#A8A8A8' />
            </View>
         </View>
         </View>
         <View className={style.btn_box} style={{marginTop:'30px'}}>
            <Button className={style.btn} onClick={()=>logoutUser()}>退出登录</Button>
         </View>
   </View>)
  }