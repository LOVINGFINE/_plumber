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
import CheckEmpty from '@/components/empty'
import {postCodeUser,postOrderCreate,getGoodsWith} from '@/models/order'
import {TPro} from '../tabPage/order/type'
import {Tr} from './type'
export default ()=>{
   const [info_show,setInfo] = useState<boolean>(false)
   const [info_text,setInfoText] = useState<string>('')
   const [modal_show,setModal] = useState<boolean>(false)
   const [isPost,setIsPost] = useState<boolean>(false)
   const [steps,setSteps] =  useState<number>(0)
   const [modal_type,setModalEle] = useState<any>('tel')
   const [loading,setLoad] = useState<boolean>(false)
   const [delete_id,setDeleteId] = useState<number>(0)
  /**
   * 表单数据
   */
   const [code,setCode] = useState<string>('')
   const [phone,setPhone] = useState<string>('')
   const [custom_name,setCostomName] = useState<string>('')
   const [custom_tel,setCostomTel] = useState<string>('')
   const [order_data,setUserOrder] = useState<Tr>({
      address: '',
      codeId: 0,
      phone:'',
      goodsList:[],
      id: 0,
      money: 0 
   })
   const [user_data,setUserData] = useState<any>({
      name: '',
      phone: '',
   })
   useEffect(()=>{
      let d = Taro.getStorageSync('user') || {phone:''}
      setPhone(d.phone)
   },[])
   useEffect(()=>{
      let u  = Taro.getStorageSync('costom')
      let id = getCurrentInstance().router.params.id || ''
      if(id!=''){
         setSteps(1)
         let order = Taro.getStorageSync('order')
         setUserOrder(order)
         setUserData(u)
         setCostomName(u.name)
         setCostomTel(u.phone)
      }
      // setCustomAddress(getCurrentInstance().router.params.id || '')
   },[])
   const findCodeView = ()=>{
      Taro.scanCode({}).then((res:any)=>{
          // 扫码成功
         let {result} = res
          getGoodsWith(result).then(e=>{
               let {code,data,message} = e
               if(code===200){
                  Taro.redirectTo({url:'/pages/codeInfo/codeSuccess'})
                  let or_d = {
                     ...order_data
                  }
                  let l = [...or_d.goodsList]
                  l.push({
                     bcn: data.bigCategory,
                     code: data.goodsCode,
                     ct: 1,
                     name: data.goodsName,
                     pr: data.price,
                     scn: data.smallCategory
                  })
                  or_d.goodsList = l
                  or_d.money = conCulte(l)
                  setUserOrder(or_d)
                  Taro.setStorageSync('order',or_d)
                  
               }else {
                  Taro.redirectTo({url:'/pages/codeInfo/codeError'})
               }
          })
          
      }).catch(()=>{
         // 扫码失败
         
      })
   }
   const postDataSteps = ()=>{
      // 提交数据
      if(isPost||steps===1){
         // 可以操作
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
                  let d = {...order_data}
                  let u = {...user_data}
                  u.phone = data.phone
                  u.name = data.name
                  d.id = data.id
                  d.codeId = data.codeId
                  d.phone = phone
                  setUserOrder(d)
                  setUserData(u)
                  Taro.setStorageSync('order',d)
                  Taro.setStorageSync('costom',u)
                  setSteps(1)
               }
            }) 
         }else {
            // 提交安装单
            if(order_data.address!=''){
               commitOrder()
            }else {
               setLoad(false)
               setInfoBox('请填写地址')
            }
         }
      }
   }
   const commitOrder = ()=>{
      if(order_data.goodsList.length>0){
         if(order_data.money>0){
            postOrderCreate(order_data).then(res=>{
               setLoad(false)
               let {code,message} = res
               if(code===200){
                  Taro.reLaunch({ url: "/pages/first/index" });
               }else {
                  setInfoBox(message)
               }
            })
         }else {
            setLoad(false)
            setInfoBox('安装产品已被其他水电工使用，请重新扫码添加')
         }
      }else {
         setLoad(false)
         setInfoBox('请添加产品')
      }
   }
   const conCulte = (e:Array<TPro>)=>{
      let n = 0
      e.forEach(ele=>{
         n+=ele.pr
      })
      return n
   }
   const deletePro =()=>{
      // 删除商品
      let or_d = {
         ...order_data
      }
      let l = [...or_d.goodsList]
      l.splice(delete_id,1)
      or_d.goodsList = l
      or_d.money = conCulte(l)
      setUserOrder(or_d)
      Taro.setStorageSync('order',or_d)
   }
   const targetChange = (value:string,fun:(e:any)=>void)=>{
          fun(value)
        if(steps===0){
         setIsPost(code!=''&&phone!='')
        }
   }
   const handleModalShow = (e)=>{
      switch(e){
         case 'delete':
            return <View style={{textAlign:'center',lineHeight:'80px'}}>确认删除该商品吗？</View>
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
      let d = {
         ...user_data
       }
       
      switch(modal_type){
         case 'delete':
          deletePro()
            break;
         case 'tel':
            d.phone = custom_tel
            setUserData(d)
            Taro.setStorageSync('costom', d)
            break;
         case 'name':
             d.phone = custom_name
             setUserData(d)
             Taro.setStorageSync('costom', d)
             break;
         default:
            return 
      }
      setModal(false)
   }
   const clickModal = (e)=>{
      setModalEle(e)
      setModal(true)
   }
   // const handleMapShow = ()=>{
   //    Taro.redirectTo({url:'/pages/product/mapView?id='+order_data.id})
   // }
   const setInfoBox = (text:string)=>{
       setInfoText(text)
       setInfo(true)
   }
   const setCustomAddress = (text:string)=>{
      let d = {...order_data}
      d.address = text
      setUserOrder(d)
      Taro.setStorageSync('order',d)
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
               <View  className={style.name_item_text} onClick={()=>clickModal('name')}>{user_data.name===''?<View className={style.put_info}>点击输入业主姓名</View>:user_data.name}</View>
               <AtIcon value='chevron-right'  size='15' color='#A8A8A8' onClick={()=>clickModal('name')}></AtIcon>
            </View>
            <View className={style.name_ipt_item}>
               <View className={style.name_item_lebal}>业主手机号</View>
               <View  className={style.name_item_text}  onClick={()=>clickModal('tel')} >{user_data.name===''?<View className={style.put_info}>点击输入业主手机号</View>:user_data.phone}</View>
               <AtIcon value='chevron-right'  size='15' color='#A8A8A8' onClick={()=>clickModal('tel')} />
            </View>
            <View className={style.name_ipt_item}>
               <View className={style.name_item_lebal}>业主地址</View>
               <Input className={style.name_ipt_text}   placeholder='请输入地址' value={order_data.address} onInput={(e)=>setCustomAddress(e.detail.value)} />
               {/* <View  className={style.name_item_text} onClick={()=>handleMapShow()}>{order_data.address===''?<View className={style.put_info}><Image className={style.map_icon} src={map_icon} /><View>选择地址</View></View>:order_data.address}</View>
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
                     order_data.goodsList.map((ele:TPro,i:number)=>{
                        return <View className={style.pro_item} key={ele.code}>
                               <View className={style.pro_item_type}>{ele.bcn}:</View>
                                 <View className={style.pro_item_name} >
                                    <View style={{width:'284px'}}>{ele.name}</View>
                                    <View className={style.pro_delete_text} onClick={()=>{
                                       setDeleteId(i)
                                       clickModal('delete')
                                    }}>删除</View>
                                 </View>
                               <View className={style.pro_item_bottom}>
                                 <View style={{marginRight:'12px'}}>ID: {ele.code}</View>
                                  <View>商品价格 ￥{ele.pr/100}</View>
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
         <CheckEmpty isShow={order_data.money>0&&steps!=0} empty_ele={<View />} >
            <View className={style.num_show_text}>商品总金额: ￥{order_data.money/100}</View>
         </CheckEmpty>
         <View className={style.bottom_btn_box} >
            <Button className={style.bottom_btn} style={isPost||steps===1?{}:{
               backgroundColor:'#003aa56e',
               boxShadow:'2px 2px 2px  #003aa531'
            }} onClick={postDataSteps}>提交</Button>
         </View>
   </View>)
}