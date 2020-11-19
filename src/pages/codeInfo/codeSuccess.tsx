import React, { useEffect, useState } from 'react'
import CodeView from './CodeView'
import Taro from '@tarojs/taro'
import {getGoodsWith} from '@/models/order'
export default () => {
  const [id,setId] = useState<string>('')
  const [order_data,setOrderData] = useState<any>({})
  useEffect(()=>{
    let d= Taro.getStorageSync('order') || {id:""}
    setOrderData(d)
    setId(d.id)
  },[])
  const handleOk = () => { 
    Taro.scanCode({
   }).then((res:any)=>{
       // 扫码成功
       const conCulte = (e:Array<any>)=>{
        let n = 0
        e.forEach(ele=>{
           n+=ele.pr
        })
        return n
      }
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
                     code: data.id,
                     ct: 1,
                     name: data.goodsName,
                     pr: data.price,
                     scn: data.smallCategory
                  })
                  or_d.goodsList = l
                  or_d.money = conCulte(l)
                  Taro.setStorageSync('order',or_d)
                  
               }else {
                  Taro.redirectTo({url:'/pages/codeInfo/codeError'})
               }
          })
   }).catch(()=>{
      // 扫码失败
      
   })
   }
  const handleCancel = () => { 
    Taro.redirectTo({url:`/pages/product/index?id=${id}`})
  }

  return <CodeView iserror={false} handleOk={handleOk} handleCancel={handleCancel} />
}
