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
import {searchOrderList} from '@/models/order'
export default ()=>{
   const [list,setList] = useState<Array<Ilist>>([])
   const [isFocus,setFocus] = useState<boolean>(false)
   const [modal_show,setModal] = useState<boolean>(false)
   const [text,setText] = useState<string>('')
   const [history,setHistory] = useState<boolean>(false)
   const [h_list,setHisList] = useState<Array<string>>([])
   const [page, setPage] = useState<number>(1);
   const [refresh, setRefresh] = useState<boolean>(false);
   const [more, setMore] = useState<boolean>(false);
   useEffect(()=>{
     setHisList(Taro.getStorageSync('history') || []) 
   },[])
   const cancelSearch = ()=>{
      setText('')
      setFocus(false)
      Taro.navigateBack({delta:1})
   }
   const handleSearch = (key:string)=>{
         // 搜索
         setHistory(false)
         let l = h_list
         if(l.findIndex(ele=>ele===key)!=-1||l.findIndex(ele=>ele===key)===0){
<<<<<<< HEAD
              setText(key)
              onPageChange(1,key)
=======
              onPageChange(page)
>>>>>>> b17a2ae44d4c03930fd8378c9e516cebf9a18142
         }else {
            l.push(key)
            Taro.setStorageSync('history',l)
            setHisList([...l])
<<<<<<< HEAD
            onPageChange(1,key)
=======
            onPageChange(page)
>>>>>>> b17a2ae44d4c03930fd8378c9e516cebf9a18142
         }
   }
   const deleteHistory= ()=>{
     // 删除历史记录
     Taro.setStorageSync('history',[])
     setHisList([])
   }
   const onPageChange = (p: number,str) => {
    setPage(p);
     searchOrderList(p,str).then(res=>{
         if(res.code===200){
          
           let {data} = res
           if(p===1){
            setRefresh(false);
             // 刷新
             setList(data)
           }else {
            setMore(false);
             // 加载更多
             let l = list
             setList(l.concat(data))
           }
         }
     })
  };
   return (<View className={style.ser_box} >
     <PopModal title={<View style={{lineHeight:'65px',textAlign:'center'}}>确定删除历史记录么?</View>} show={modal_show} handleOk={deleteHistory} handleCancel={()=>setModal(false)}/>
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
           <ScrollView
            refresherEnabled
            refresherTriggered={refresh}
            refresherBackground="#F8F8F8"
            refresherThreshold={60}
            lowerThreshold={10}
            onRefresherRefresh={() => {
              setRefresh(true);
              onPageChange(1,text);
            }}
            onScrollToLower={() => {
              setMore(true);
              onPageChange(page + 1,text);
            }}
            scrollY
            className={style.ser_main}>
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
<<<<<<< HEAD
                             
=======
                             setText(ele)
>>>>>>> b17a2ae44d4c03930fd8378c9e516cebf9a18142
                             handleSearch(ele)
                           }}>{ele}</View>
                        })
                     }
                     </View>
                  </CheckEmpty>
                 </View>
               
              ):(
                <View style={{padding:'0 15px',width:'100%',boxSizing:'border-box',marginTop:'15px',backgroundColor:'#F8F8F8'}}>
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