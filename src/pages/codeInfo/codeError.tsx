import React, { useEffect, useState } from 'react'
import CodeView from './CodeView'
import Taro,{getCurrentInstance}  from '@tarojs/taro'
import {getGoodsWith} from '@/models/order'
export default () => {
  const [id,setId] = useState<string>('')
  const [order_data,setOrderData] = useState<any>({})
  const [errorText,setText] = useState<string>('')
  useEffect(()=>{
   let i = getCurrentInstance().router.params.id || ''
   let d= Taro.getStorageSync(i) || {id:""}
   setOrderData(d)
   setId(d.id)
   setText(getCurrentInstance().router.params.errorText || '扫码失败')
  },[])
  const handleOk = () => {
    Taro.scanCode({}).then((res:any)=>{
      // 扫码成功
      const conCulte = (e:Array<any>)=>{
        let n = 0
        e.forEach(ele=>{
           n+=ele.pr
        })
        return n
      }
       let {result} = res
          getGoodsWith(result,order_data.id).then(e=>{
               let {code,data,message} = e
               if(code===200){
                  let or_d = {
                     ...order_data
                  }
                  let l = [...or_d.goodsList]
                  if(l.findIndex(ele=>ele.code===data.goodsCode)===-1){
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
                     Taro.setStorageSync(or_d.id.toString(),or_d)
                     Taro.redirectTo({url:'/pages/codeInfo/codeSuccess?id='+or_d.id})
                  }else {
                     Taro.redirectTo({url:'/pages/codeInfo/codeError?errorText=' +'该商品已添加，请勿重复添加'+'&id='+order_data.id})
                  }
               }else {
                  Taro.redirectTo({url:'/pages/codeInfo/codeError?errorText=?errorText=' + message+'&id='+order_data.id})
               }
          })
  }).catch(()=>{
     // 扫码失败
   //   Taro.redirectTo({url:'/pages/codeInfo/codeError?errorText=请联系欧普客服确认产品是否为真'+'&id='+order_data.id})
  })
   }
  const handleCancel = () => { 
   Taro.redirectTo({url:`/pages/product/index?id=${id}`})
  }
  return <CodeView iserror={true} handleOk={handleOk} errorDesc={errorText} handleCancel={handleCancel} />
}
