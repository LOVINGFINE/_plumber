import React, { Component,useState,useEffect } from 'react'
import {
View,
Button,
Input
} from '@tarojs/components'
import style from './index.module.less'
interface Iprops {
    onSuccess:()=>void
    setCode:(e:string) =>void
}
const ipt_list:number[] = [
    1,2,3,4,5,6
]
export default (
    {
        onSuccess,
        setCode
    }:Iprops
)=>{
      const [code_text,setCodeText] = useState('')

      const [ipt_focus,setFocus] = useState<boolean>(true)
      const checkIpt = (e:string)=>{
          setCodeText(e) 
          setCode(e)
      }
      const getKeybord = ()=>{
          if(code_text.length===6){
             // 输入完成
             onSuccess()
          }
      }
      const showCodeIndex = (e:number)=>{
        
           switch(e){
                case 1:
                   return code_text.split('')[0]
                case 2:
                    return code_text.split('')[1]
                case 3:
                    return code_text.split('')[2]
                case 4:
                    return code_text.split('')[3]
                case 5:
                    return code_text.split('')[4]
                case 6:
                    return code_text.split('')[5]
                default:
                    return ''                                               
           }
      }
   return (<>
        <Input value={code_text} focus={ipt_focus} confirm-type="search" onFocus={()=>getKeybord()} onBlur={()=>setFocus(false)} onInput={(e)=>checkIpt(e.detail.value)} maxlength={6} className={style.ipt_hinden} />
        {
            ipt_list.map(ele=>{
             return <View onClick={()=>{setFocus(true)}}  className={style.ipt_text} key={ele}>{showCodeIndex(ele)}</View>
            })
        }
   </>)
  }
