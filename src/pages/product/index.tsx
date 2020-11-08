import React, { Component,useState,useEffect } from 'react'
import Taro from '@tarojs/taro'
import { AtIcon } from 'taro-ui'
import {
View,
Input,
Button,
Image,
ScrollView,
} from '@tarojs/components'
import PopInfo from '@/components/Pop-ups/info'
import PopModal from '@/components/Pop-ups/modal'
import style from './style.module.less'
import {map_icon} from '@/assets/model'
import CheckEmpty from '@/components/empty'
export default ()=>{
   
   const [info_show,setInfo] = useState<boolean>(false)
   const [modal_show,setModal] = useState<boolean>(false)
   const [isPost,setIsPost] = useState<boolean>(false)
   const [steps,setSteps] =  useState<number>(0)
   const [modal_type,setModalEle] = useState<any>('tel')

   // 
   const [pro_list,setProList] = useState<Array<any>>([
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
   ])
   const [delete_id,setDeleteId] = useState<string>('')
   const [total_num,setTotal] = useState<number>(0)
  /**
   * 表单数据
   */
   const [code,setCode] = useState<string>('')
   const [phone,setPhone] = useState<string>('')
   const [custom_name,setCostomName] = useState<string>('')
   const [custom_tel,setCostomTel] = useState<string>('')
   const [custom_address,setCustomAddress] = useState<string>('')
   useEffect(()=>{
      let n = 0
      pro_list.forEach(ele=>{
         n+=ele.num
      })
      setTotal(n)
   },[pro_list])
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
      if(isPost){
         // 可以操作
         if(steps===0){
            setSteps(1)
         }else {

         }
      }else {
         return 
      }
   }
   const deletePro =()=>{
      // 删除商品

   }
   const targetChange = (value:string,fun:(e:any)=>void)=>{
          fun(value)
        if(steps===0){
         if(code!=''){
            setIsPost(true)
         }
        }
   }
   const handleModalShow = (e)=>{
      switch(e){
         case 'delete':
            return <View style={{textAlign:'center'}}>确认删除该商品吗？</View>
         case 'tel':
            return <View className={style.custom_ipt_box}>
                   <View className={style.custom_ipt_title}>修改手机号</View>
                   <View className={style.custom_ipt_conent}>
                   <View className={style.custom_ipt_conent_lebal}>手机号</View>
                   <Input placeholder='请输入手机号' value={custom_tel} maxlength={11} type='number' className={style.custom_ipt_conent_text} onInput={(e)=>setCostomTel(e.detail.value)}  />
                   </View>
            </View>
         case 'name':
            return <View className={style.custom_ipt_box}>
            <View className={style.custom_ipt_title}>修改姓名</View>
            <View className={style.custom_ipt_conent}>
            <View className={style.custom_ipt_conent_lebal}>姓名</View>
            <Input placeholder='请输入姓名' value={custom_name} className={style.custom_ipt_conent_text} onInput={(e)=>setCostomName(e.detail.value)}  />
            </View>
     </View>
         default:
            return ''
      }
       
   }
   const handleModalOK = ()=>{
      switch(modal_type){
         case 'delete':
            deletePro()
            return setModal(false)
         case 'tel':
            return setModal(false)
         case 'name':
            return setModal(false)
         default:
            return setModal(false)
      }
   }
   const clickModal = (e)=>{
      setModalEle(e)
      setModal(true)
   }
   const handleMapShow = ()=>{
      Taro.navigateTo({url:'/pages/product/mapView'})
   }
   return (<View className={style.box} >
        <PopInfo show={info_show} setShow={setInfo} btn_text='我知道了' title='凭证码错误请重新输入凭证码' time={10} />
        <PopModal 
        title={handleModalShow(modal_type)}
        show={modal_show} 
        handleCancel={()=>setModal(false)} 
        handleOk={()=>handleModalOK()} />
         {
            steps===0?(<View style={{padding:'0 15px',boxSizing:'border-box'}}>
            <View className={style.name_ipt_item}>
            <View className={style.name_item_lebal}>凭证码</View>
            <Input className={style.name_item_text} style={{textAlign:'right'}} placeholder='请输入凭证码' value={code} onInput={(e)=>targetChange(e.detail.value,setCode)} />
            </View>
            <View className={style.name_ipt_item}>
               <View className={style.name_item_lebal}>贡献分收入手机号</View>
               <Input className={style.name_item_text}  style={{textAlign:'right'}} placeholder='贡献分收入手机号' value={phone} onInput={(e)=>targetChange(e.detail.value,setPhone)} />
            </View>
            </View>):(<>
            <View style={{padding:'0 15px',boxSizing:'border-box'}}>
            <View className={style.name_ipt_item}>
               <View className={style.name_item_lebal}>业主姓名</View>
               <View  className={style.name_item_text} onClick={()=>clickModal('name')}>{custom_name===''?<View className={style.put_info}>点击输入业主姓名</View>:custom_name}</View>
               <AtIcon value='chevron-right'  size='15' color='#A8A8A8' onClick={()=>clickModal('name')}></AtIcon>
            </View>
            <View className={style.name_ipt_item}>
               <View className={style.name_item_lebal}>业主手机号</View>
               <View  className={style.name_item_text}  onClick={()=>clickModal('tel')} >{custom_tel===''?<View className={style.put_info}>点击输入业主手机号</View>:custom_tel}</View>
               <AtIcon value='chevron-right'  size='15' color='#A8A8A8' onClick={()=>clickModal('tel')} />
            </View>
            <View className={style.name_ipt_item}>
               <View className={style.name_item_lebal}>业主地址</View>
               <View  className={style.name_item_text} onClick={()=>handleMapShow()}>{custom_address===''?<View className={style.put_info}><Image className={style.map_icon} src={map_icon} /><View>选择地址</View></View>:custom_address}</View>
               <AtIcon value='chevron-right'  size='15' color='#A8A8A8' />
            </View>
            <View className={style.name_ipt_item} style={{border:'none'}}>
               <View className={style.name_item_lebal}>安装产品</View>
               <View />
            </View>
         </View>
            <ScrollView scrollY className={style.pro_main}>
            <View style={{padding:'0 15px',boxSizing:'border-box'}}>
                {
                     pro_list.map((ele:any)=>{
                        return <View className={style.pro_item} key={ele.id}>
                               <View className={style.pro_item_type}>{ele.type_name}:</View>
                                 <View className={style.pro_item_name} >
                                    <View style={{width:'284px'}}>{ele.name}</View>
                                    <View className={style.pro_delete_text} onClick={()=>{
                                       setDeleteId(ele.id)
                                       clickModal('delete')
                                    }}>删除</View>
                                 </View>
                               <View className={style.pro_item_bottom}>
                                 <View style={{marginRight:'12px'}}>ID: {ele.id}</View>
                                  <View>贡献分 {ele.num}</View>
                               </View>
                        </View>
                     })
                }
            </View>
            <View className={style.pro_btn_box}>
               <Button className={style.pro_btn} onClick={()=>findCodeView()}>+添加</Button>
            </View>
           </ScrollView>
               </>)
         }
         <CheckEmpty isShow={total_num>0&&steps!=0} empty_ele={<View />} >
            <View className={style.num_show_text}>商品总贡献分: {total_num}</View>
         </CheckEmpty>
         <View className={style.bottom_btn_box} >
            <Button className={style.bottom_btn} style={isPost?{}:{
               backgroundColor:'#003aa56e',
               boxShadow:'2px 2px 2px  #003aa531'
            }} onClick={postDataSteps}>提交</Button>
         </View>
   </View>)
}