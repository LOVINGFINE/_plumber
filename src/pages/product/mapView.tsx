import React, { Component,useState,useEffect } from 'react'
import Taro from '@tarojs/taro'
import { AtIcon } from 'taro-ui'
import {
View,
Button,
Image,
Input,
Map,
ScrollView
} from '@tarojs/components'
import style from './style.module.less'
import PopUp from '@/components/Pop-ups/text'
import {search_icon} from '@/assets/model'
export default ()=>{
    const [search_text,setSearchText] = useState<string>('')
    const [lat,setLat] = useState<number>(40)
    const [lng,setLng] = useState<number>(31.23)
    const [selest_add,setSelect] = useState<string>('')
    const [map_list,setMpaList] = useState<Array<any>>([
        {
            name:'上海南站',
            dec:'徐汇区沪闵路9001号',
            destance:100,
            id:'11'
        },
        {
            name:'上海南站',
            dec:'徐汇区沪闵路9001号',
            destance:100,
            id:'22'
        },
        {
            name:'上海南站',
            dec:'徐汇区沪闵路9001号',
            destance:100,
            id:'33'
        },
    ])
   useEffect(()=>{
   },[])
    const handleSearch = ()=>{

    }  
   return (<View className={style.map_box} >
          <Map style={{width:'100%',height:'100%'}} onClick={()=>{}} latitude={lat} longitude={lng} />
          <View className={style.map_serch_box}>
                 <View className={style.map_search_top}>
                     <View className={style.map_cancel}>取消</View>
                     <View className={style.map_serch_ipt_box}>
                        <Image src={search_icon} className={style.search_icon} />
                        <Input 
                        className={style.search_ipt} 
                        placeholder="搜索地点" 
                        value={search_text} 
                        onInput={(e)=>setSearchText(e.detail.value)} 
                        onConfirm={()=>handleSearch()}
                        confirmType="search"
                        />
                     </View>
                     <View className={style.map_top_ok} onClick={()=>handleSearch()}>确认</View>
                 </View>
                 <ScrollView scrollY style={{width:'100%',height:'196px',marginTop:'15px'}}>
                 <View className={style.map_list}>
                 {
                     map_list.map((ele:any)=>{
                         return <View className={style.map_item} onClick={()=>setSelect(ele.id)} key={ele.id}>
                             <View className={style.map_item_con}>
                                <View className={style.map_item_title}>{ele.name}</View>
                                <View className={style.map_item_dec}>
                                    <View>{ele.destance}m</View>
                                    <View className={style.map_item_line} />
                                    <View>{ele.dec}</View>
                                </View>
                             </View>
                            {
                                ele.id===selest_add? <AtIcon value='check' size={20} color='#003BA5' />:""
                            }
                         </View>
                     })
                 }    
                 </View>
                 </ScrollView>
          </View>
   </View>)
  }