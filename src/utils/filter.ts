import moment from 'moment'

export const filterTime = (unix:number) =>{
    
    return moment(unix).format('YYYY-MM-DD HH:mm')
}

export const filterMouth = (unix:number)=>{
   return moment(unix).format('YYYY-MM')
}