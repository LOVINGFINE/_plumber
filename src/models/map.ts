import { _get, _post } from "../services/request";
export const KEY_MAP = 'EOEBZ-6O4C6-C5DS5-MY7YS-C32Y2-CFFKN'
export const getSearchMapList = (data)=>{
    return _post(`/hydropower/order/map/search`,{
        key:KEY_MAP,
        keyword:data.keyword,
        region:data.region
    })
}