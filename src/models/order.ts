import { _get, _post } from "../services/request";

export const getOrderList = (page:number ) => {
  return _post(`/hydropower/order/search/list`, {
    pageNum: page,
    pageSize: 30,
    search: ''
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