import { _get, _post } from "../services/request";
import {Tr} from '../pages/product/type'
export const getOrderList = (page:number ) => {
  return _post(`/hydropower/order/search/list`, {
    pageNum: page,
    pageSize: 30
  });
};
export const searchOrderList = (page:number,text:string ) => {
  return _post(`/hydropower/order/search/list`, {
    pageNum: page,
    pageSize: 30,
    search: text
  });
};

export const getOrderDetail = (id: string) => {
  return _get(`/hydropower/order/detail?orderId=${id}`);
};


export const postCodeUser = (data:{
  phone:string
  code:string
})=>{
  return _post(`/hydropower/order/exchange/info`,data)
}

export const postOrderCreate = (data:Tr) =>{
  return _post(`/hydropower/order/commit`,data)
}

export const getGoodsWith = (info:string,id:any)=>{
  return _post(`/hydropower/order/scan/info`,{scanInfo:info,orderId:id})
} 