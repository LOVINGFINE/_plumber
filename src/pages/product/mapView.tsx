import React, { Component,useState,useEffect } from 'react'
import Taro,{getCurrentInstance} from '@tarojs/taro'
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
import {getSearchMapList,KEY_MAP} from '@/models/map'
import {search_icon} from '@/assets/model'
export default ()=>{
    const [search_text,setSearchText] = useState<string>('')
    const [lat,setLat] = useState<number>(0)
    const [lng,setLng] = useState<number>(0)
    const [select_add,setSelect] = useState<number>(-1)
    const [map_list,setMpaList] = useState<Array<any>>([])
    const [url,setUrl] = useState<string>('')
    const [id,setId] = useState<string>('')
    const [city,setCity] = useState<string>('')
   useEffect(()=>{
       setId(getCurrentInstance().router.params.id || '')
       let user = Taro.getStorageSync('user') || {cityName:'上海市'}
       if(user.cityName!=''){
            setCity(user.cityName)
       }else {
        setCity('上海市')
       }
       Taro.getLocation({

       }).then(res=>{
           console.log(res);
           let {latitude,longitude} = res
           setLat(latitude)
           setLng(longitude)
       }).catch(res=>{
           Taro.navigateBack({delta:1})
       })
   },[])
    const handleSearch = ()=>{
        getSearchMapList({
            keyword:search_text,
            region:city
        }).then(res=>{
            let {code,data} = res
            if(code===200){
                setMpaList(res.data)
            }
        })
    }  
    const handleBack = ()=>{
        if(url!=''){
            let order = Taro.getStorageSync(id)
            order.address = url
            
            Taro.setStorageSync(id,order)
        }
        Taro.redirectTo({url:`/pages/product/index?id=${id}`})
    }
   return (<View className={style.map_box} >
          {
              lat!=0||lng!=0?(<Map style={{width:'100%',height:'100%'}} onClick={()=>{}} latitude={lat} longitude={lng} />):(<View/>)
          }
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
                     <View className={style.map_top_ok} onClick={()=>handleBack()}>确认</View>
                 </View>
                 <ScrollView scrollY style={{width:'100%',height:'196px',marginTop:'15px'}}>
                 <View className={style.map_list}>
                 {
                     map_list.map((ele:any,i:number)=>{
                         return <View className={style.map_item} onClick={()=>{
                            if(select_add===-1||i!=select_add){
                                setSelect(i)
                                setUrl(ele)
                            }else {
                                setSelect(-1)
                                setUrl('')
                            }
                         }} key={ele}>
                             <View className={style.map_item_con}>
                                <View className={style.map_item_title}>{ele}</View>
                                {/* <View className={style.map_item_dec}>
                                    <View>{ele.destance}m</View>
                                    <View className={style.map_item_line} />
                                    <View>{ele.dec}</View>
                                </View> */}
                             </View>
                            {
                                i===select_add? <AtIcon value='check' size={20} color='#003BA5' />:<View />
                            }
                         </View>
                     })
                 }    
                 </View>
                 </ScrollView>
          </View>
   </View>)
  }