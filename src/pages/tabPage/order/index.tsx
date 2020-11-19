import React, { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, Image, Button, ScrollView } from "@tarojs/components";
import PopUp from "@/components/Pop-ups/text";
import style from "./index.module.less";
import CheckEmpty from "@/components/empty";
import OrderList from "./components/order_list";
import { Ilist } from "./type";
import { search_icon, warning, order_bg } from "@/assets/model";
import { getOrderList } from "@/models/order";
export default () => {
  const [list, setList] = useState<Array<Ilist>>([]);
  const [page, setPage] = useState<number>(1);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [more, setMore] = useState<boolean>(false);
  useEffect(()=>{
    onPageChange(page)
  },[])
  const onPageChange = (p: number) => {
    setPage(p);
     getOrderList(p).then(res=>{
         if(res.code===200){
           let {data} = res
           setRefresh(false);
           setMore(false);
           if(p===1){
             // 刷新
             setList(data)
           }else {
             // 加载更多
             let l = list
             l.concat(data)
             setList(l)
           }
         }
     })
  };
  return (
    <View className={style.box}>
      <View className={style.top}>
        <View
          className={style.top_search}
          onClick={() =>
            Taro.navigateTo({ url: "/pages/tabPage/order/search" })
          }
        >
          <Image src={search_icon} className={style.top_search_icon} />
          搜索业主姓名/业主点话/业主地址
        </View>
        <Button
          className={style.order_add}
          onClick={() => Taro.navigateTo({ url: "/pages/product/index" })}
        >
          +安装产品
        </Button>
      </View>
      <ScrollView
        refresherEnabled
        refresherTriggered={refresh}
        refresherBackground="#F8F8F8"
        refresherThreshold={60}
        lowerThreshold={10}
        onRefresherRefresh={() => {
          setRefresh(true);
          onPageChange(1);
        }}
        onScrollToLower={() => {
          setMore(true);
          onPageChange(page + 1);
        }}
        scrollY
        className={style.main}
      >
        <View
          style={{
            padding: "0 15px",
            width: "100%",
            boxSizing: "border-box",
            marginTop: "15px"
          }}
        >
          <CheckEmpty isShow={list.length > 0} empty_ele={<Empty />}>
            <OrderList list={list} />
          </CheckEmpty>
        </View>
        <View className={style.load_more}>{more ? "加载更多..." : ""}</View>
      </ScrollView>
    </View>
  );
};
const Empty = () => {
  return (
    <View className={style.empty_box}>
      <Image src={warning} className={style.empty_img} />
      <View style={{ marginTop: "12px" }}>暂无订单</View>
    </View>
  );
};
