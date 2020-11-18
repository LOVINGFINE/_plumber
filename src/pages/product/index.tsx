import React, { useState,useEffect } from 'react'
import Taro,{getCurrentInstance} from '@tarojs/taro'
import { AtIcon,AtToast  } from 'taro-ui'
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
import {postCodeUser} from '@/models/order'
import {TPro} from '../tabPage/order/type'
export default ()=>{
   
   const [info_show,setInfo] = useState<boolean>(false)
   const [info_text,setInfoText] = useState<string>('')
   const [modal_show,setModal] = useState<boolean>(false)
   const [isPost,setIsPost] = useState<boolean>(false)
   const [steps,setSteps] =  useState<number>(1)
   const [modal_type,setModalEle] = useState<any>('tel')
   const [loading,setLoad] = useState<boolean>(false)
   // 
   const [pro_list,setProList] = useState<Array<TPro>>([])
   const [delete_id,setDeleteId] = useState<string>('')
   const [total_num,setTotal] = useState<number>(0)
  /**
   * 表单数据
   */
   const [code,setCode] = useState<string>('139073')
   const [phone,setPhone] = useState<string>('')
   const [custom_name,setCostomName] = useState<string>('')
   const [custom_tel,setCostomTel] = useState<string>('')
   const [custom_address,setCustomAddress] = useState<string>('')
   const [order_data,setUserOrder] = useState<any>({

   })
   useEffect(()=>{
      let n = 0
      pro_list.forEach(ele=>{
         n+=ele.pr
      })
      setTotal(n)
   },[pro_list])
   useEffect(()=>{
      let d = Taro.getStorageSync('user') || {phone:''}
      let id = getCurrentInstance().router.params.id || ''
      if(id!=''){
         setSteps(1)
         let order = Taro.getStorageSync('order_data')
         setUserOrder(order)
      }
      setPhone(d.phone)
      // setCustomAddress(getCurrentInstance().router.params.id || '')
   },[])
   const findCodeView = ()=>{
      Taro.scanCode({}).then((res:any)=>{
          // 扫码成功
          console.log(res);
          
          Taro.navigateTo({url:'/pages/codeInfo/codeSuccess'})
      }).catch(()=>{
         // 扫码失败
         Taro.navigateTo({url:'/pages/codeInfo/codeError'})
      })
   }
   const postDataSteps = ()=>{
     
      // 提交数据
      if(isPost){
         // 可以操作
         //  setSteps(1)
         setLoad(true)
         if(steps===0){
            postCodeUser({code,phone}).then(res=>{
               let {code,data,message} = res
               if(code===-1){
                  setLoad(false)
                  setInfoBox(message)
               }else {
                  setLoad(false)
                  setCostomName(data.name)
                  setCostomTel(data.phone)
                  setSteps(1)
               }
               
            })
            
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
         setIsPost(code!=''&&phone!='')
        }else {

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
   const setInfoBox = (text:string)=>{
       setInfoText(text)
       setInfo(true)
   }
   return (<View className={style.box} >
        <PopInfo show={info_show} setShow={setInfo}  title={info_text} time={10} />
        <PopModal 
        title={handleModalShow(modal_type)}
        show={modal_show} 
        handleCancel={()=>setModal(false)} 
        handleOk={()=>handleModalOK()} />
        <AtToast isOpened={loading} text="校验中" hasMask={true} duration={0} status="loading"></AtToast>
         {
            steps===0?(<View style={{padding:'0 15px',boxSizing:'border-box'}}>
            <View className={style.name_ipt_item}>
            <View className={style.name_item_lebal}>凭证码</View>
            <Input className={style.name_ipt_text}  placeholder='请输入凭证码' value={code} onInput={(e)=>targetChange(e.detail.value,setCode)} />
            </View>
            <View className={style.name_ipt_item}>
               <View className={style.name_item_lebal}>贡献分收入手机号</View>
               <Input className={style.name_ipt_text}   placeholder='贡献分收入手机号' value={phone} onInput={(e)=>targetChange(e.detail.value,setPhone)} />
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
               <Input className={style.name_ipt_text}   placeholder='请输入地址' value={custom_address} onInput={(e)=>setCustomAddress(e.detail.value)} />
               {/* <View  className={style.name_item_text} onClick={()=>handleMapShow()}>{custom_address===''?<View className={style.put_info}><Image className={style.map_icon} src={map_icon} /><View>选择地址</View></View>:custom_address}</View>
               <AtIcon value='chevron-right'  size='15' color='#A8A8A8' /> */}
            </View>
            <View className={style.name_ipt_item} style={{border:'none'}}>
               <View className={style.name_item_lebal}>安装产品</View>
               <View />
            </View>
         </View>
            <ScrollView scrollY className={style.pro_main}>
            <View style={{padding:'0 15px',boxSizing:'border-box'}}>
                {
                     pro_list.map((ele:TPro)=>{
                        return <View className={style.pro_item} key={ele.code}>
                               <View className={style.pro_item_type}>{ele.bcn}:</View>
                                 <View className={style.pro_item_name} >
                                    <View style={{width:'284px'}}>{ele.name}</View>
                                    <View className={style.pro_delete_text} onClick={()=>{
                                       setDeleteId(ele.code)
                                       clickModal('delete')
                                    }}>删除</View>
                                 </View>
                               <View className={style.pro_item_bottom}>
                                 <View style={{marginRight:'12px'}}>ID: {ele.code}</View>
                                  <View>商品价格 {ele.pr}</View>
                               </View>
                        </View>
                     })
                }
                
            </View>
            <View className={style.pro_btn_box}>
               <Button className={style.pro_btn} onClick={()=>findCodeView()}>+添加</Button>
            </View>
            <View style={{height:'60px'}}></View>
           </ScrollView>
               </>)
         }
         <CheckEmpty isShow={total_num>0&&steps!=0} empty_ele={<View />} >
            <View className={style.num_show_text}>商品总金额: {total_num}</View>
         </CheckEmpty>
         <View className={style.bottom_btn_box} >
            <Button className={style.bottom_btn} style={isPost?{}:{
               backgroundColor:'#003aa56e',
               boxShadow:'2px 2px 2px  #003aa531'
            }} onClick={postDataSteps}>提交</Button>
         </View>
   </View>)
}