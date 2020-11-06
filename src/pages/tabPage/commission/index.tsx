import React, { Component,useState,useEffect } from 'react'
import {
View,
} from '@tarojs/components'
import TabBar from '@/components/custom-tab-bar/index'
import style from './index.module.less'
export default ()=>{

   return (<View className={style.box}>
        <TabBar />
   </View>)
  }