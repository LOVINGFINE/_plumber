import React, { Component,useState,useEffect } from 'react'
import {
View,
Button,
Input
} from '@tarojs/components'
import style from './index.module.less'
interface Iprops {
    onSuccess:(e:any)=>void
}
export default (
    {
        onSuccess
    }:Iprops
)=>{
      const [code_1,setCode1] = useState<any>('')
      const [code_2,setCode2] = useState<any>('')
      const [code_3,setCode3] = useState<any>('')
      const [code_4,setCode4] = useState<any>('')
      const [code_5,setCode5] = useState<any>('')
      const [code_6,setCode6] = useState<any>('')
      const [ipt_focus,setFocus] = useState<number>(0)
      const checkIpt = (e:any,num:number,met:Function)=>{
          met(e.detail.value)
           if(num<6){
               setFocus(num+1)
           }else {
               // 输入完毕
               onSuccess([code_1+code_2+code_3+code_4+code_5+e.detail.value])
           }
           
      }
   return (<>
      <Input type='number' focus={ipt_focus ===1} className={style.ipt_text} value={code_1} onInput={(e)=>checkIpt(e,1,setCode1)} />  
      <Input type='number' focus={ipt_focus ===2} className={style.ipt_text} value={code_2} onInput={(e)=>checkIpt(e,2,setCode2)} /> 
      <Input type='number' focus={ipt_focus ===3} className={style.ipt_text} value={code_3} onInput={(e)=>checkIpt(e,3,setCode3)} /> 
      <Input type='number' focus={ipt_focus ===4} className={style.ipt_text} value={code_4} onInput={(e)=>checkIpt(e,4,setCode4)} /> 
      <Input type='number' focus={ipt_focus ===5} className={style.ipt_text} value={code_5} onInput={(e)=>checkIpt(e,5,setCode5)} /> 
      <Input type='number' focus={ipt_focus ===6} className={style.ipt_text} value={code_6} onInput={(e)=>checkIpt(e,6,setCode6)} /> 
   </>)
  }
