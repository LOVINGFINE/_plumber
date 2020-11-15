import React from 'react'
import CodeView from './CodeView'
import Taro from '@tarojs/taro'
export default () => {
  const handleOk = () => {
    Taro.scanCode({
      onlyFromCamera:true,
   }).then((res:any)=>{
       // 扫码成功
       Taro.redirectTo({url:'/pages/codeInfo/codeSuccess'})
   }).catch(()=>{
      // 扫码失败
      
   })
   }
  const handleCancel = () => { 
    Taro.navigateBack({delta:1})
  }

  return <CodeView iserror={true} handleOk={handleOk} handleCancel={handleCancel} />
}
