import {_get,_post} from '../services/request'

export const getComTop = ()=>{
   return _post(`/hydropower/commission/refund/total`)
}

export const getComList = (page:number)=>{
   return _post(`/hydropower/commission/reflect/list`,{
      pageNum:page,
      pageSize:30
   })
}