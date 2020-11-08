import React, { useState,useEffect } from 'react'
import {
View,
Image,
Button,
ScrollView,
Input
} from '@tarojs/components'
import PopModal from '@/components/Pop-ups/modal'
import style from './index.module.less'
import CheckEmpty from '@/components/empty'
import OrderList from './components/order_list'
import {Ilist} from './type'
import Taro from '@tarojs/taro'
import {search_icon,his_delete} from '@/assets/model'
export default ()=>{
   const [list,setList] = useState<Array<Ilist>>([
      {
           id:45,
           name: '张大宝',
           phone: '12222222',
           address: '上海市 徐汇区 xx路 xx号',
           pros: [{
               name: '吊灯',
               id: '4453545354'
             },
             {
               name: '吊灯',
               id: '4453545354'
             },
             {
               name: '吊灯',
               id: '4453545354'
             }, {
               name: '吊灯',
               id: '4453545354'
             }
           ],
           pro_points: 1344,
           installTime: '2020-10-09 12:34:89',
      },
      {
        id:46,
        name: '张大宝',
        phone: '12222222',
        address: '上海市 徐汇区 xx路 xx号',
        pros: [{
            name: '吊灯',
            id: '4453545354'
          },
          {
            name: '吊灯',
            id: '4453545354'
          },
          {
            name: '吊灯',
            id: '4453545354'
          }, {
            name: '吊灯',
            id: '4453545354'
          }
        ],
        pro_points: 1344,
        installTime: '2020-10-09 12:34:89',
   },
   {
        id:48,
        name: '张大宝',
        phone: '12222222',
        address: '上海市 徐汇区 xx路 xx号',
        pros: [{
            name: '吊灯',
            id: '4453545354'
          },
          {
            name: '吊灯',
            id: '4453545354'
          },
          {
            name: '吊灯',
            id: '4453545354'
          }, {
            name: '吊灯',
            id: '4453545354'
          }
        ],
        pro_points: 1344,
        installTime: '2020-10-09 12:34:89',
   }
 ])
   const [isFocus,setFocus] = useState<boolean>(false)
   const [modal_show,setModal] = useState<boolean>(false)
   const [text,setText] = useState<string>('')
   const [history,setHistory] = useState<boolean>(false)
   const [h_list,setHisList] = useState<Array<string>>([])
   useEffect(()=>{
     setHisList(Taro.getStorageSync('history') || []) 
   },[])
   const cancelSearch = ()=>{
      setText('')
      setFocus(false)
      setHistory(true)
   }
   const handleSearch = (key:string)=>{
         // 搜索
         setHistory(false)
         let l = h_list
         if(l.findIndex(ele=>ele===key)!=-1||l.findIndex(ele=>ele===key)===0){
                
         }else {
            l.push(key)
            console.log(1);
            
            Taro.setStorageSync('history',l)
            setHisList([...l])
         }
   }
   const deleteHistory= ()=>{
     // 删除历史记录
     Taro.setStorageSync('history',[])
     console.log(8);
     
     setHisList([])
   }
   return (<View className={style.ser_box} >
     <PopModal title={'确定删除历史记录么?'} show={modal_show} handleOk={deleteHistory} handleCancel={()=>setModal(false)}/>
           <View className={style.search_top}>
               <View className={style.search_box}>
                  <Image src={search_icon} className={style.top_search_icon} />
                  <Input 
                  placeholder='搜索业主姓名/业主点话/业主地址' 
                  onBlur={()=>setFocus(false)} 
                  focus={isFocus} 
                  onFocus={()=>setHistory(true)}
                  className={style.top_search_ipt}
                  onInput={(e)=>setText(e.detail.value)}
                  confirmType='search'
                  onConfirm={()=>handleSearch(text)}
                  value={text}
                  />
               </View>
               <View className={style.search_cancel} onClick={cancelSearch}>取消</View>
           </View>
           <ScrollView scrollY className={style.ser_main}>
           {
              history?(
                <View className={style.his_box}>
                         <View className={style.his_top}>
                             <View>历史记录</View>
                             <CheckEmpty isShow={h_list.length>0} empty_ele={<View />}>
                             <Image src={his_delete} className={style.his_delete} onClick={()=>setModal(true)} />
                             </CheckEmpty>
                         </View>
                         <CheckEmpty isShow={h_list.length>0} empty_ele={<View className={style.history_empty}>暂无历史搜索记录</View>}>
                        <View className={style.his_list}>
                         {
                            h_list.map((ele:string)=>{
                               return <View key={ele} className={style.his_item} onClick={()=>{
                                 setText(ele)
                                 handleSearch(ele)
                               }}>{ele}</View>
                            })
                         }
                         </View>
                      </CheckEmpty>
                     </View>
               
              ):(
                <View style={{padding:'0 15px',width:'100%',boxSizing:'border-box',marginTop:'15px'}}>
               <CheckEmpty isShow={list.length>0} empty_ele={<Empty isText={true} />}>
                   <OrderList list={list} />
              </CheckEmpty>
              </View>
              )
           }
           
           </ScrollView>
   </View>)
  }
const Empty = ({isText}:{isText:boolean})=>{
     return <>
     {
        isText?(<View className={style.search_empty_box}>
         <View style={{marginTop:'12px'}}>没有搜索到相关订单，换个关键词试试吧~</View>
       </View>):''
     }
     </>
}