interface Iem {
    children:any,
    isShow:boolean,
    empty_ele?:any
}
export default ({children,empty_ele,isShow}:Iem) =>{
    return isShow?children:empty_ele?(empty_ele):'暂无信息'
}