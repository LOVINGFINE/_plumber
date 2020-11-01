import React, { Component,useState,useEffect } from 'react'
import {
View,
} from '@tarojs/components'
import style from './index.module.less'

import TabBar from '@/components/custom-tab-bar/index'
export default ()=>{

   return (<View className={style.box} >
        <TabBar />
   </View>)
  }
