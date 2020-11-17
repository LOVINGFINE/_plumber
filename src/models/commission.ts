import {_get,_post} from '../services/request'

export const getComTop = ()=>{
   return _post(`/hydropower/commission/refund/total`)
}

export const getComList = (data:{
   endTime: number,
	pageNum: number,
	pageSize: number,
	startTime: number
})=>{
   return _post(`/hydropower/commission/reflect/list`,data)
}