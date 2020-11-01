import React,{useState} from 'react'
import {AtTabBar} from 'taro-ui'
export default ()=>{
    const [current,setCurrent] = useState<number>(0)
    return <AtTabBar
    tabList={[
        { title: '安装订单', image: '' },
        { title: '我的佣金', image: '' },
        { title: '我的', image: '' }
      ]}
    onClick={setCurrent}
    current={current}
    fixed
  />
}