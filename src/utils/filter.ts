import moment from 'moment'

export const filterTime = (unix:number) =>{
    
    return moment(unix).format('YYYY-MM-DD HH:mm:ss')
}
export const filterTimeDay = (unix:number) =>{
    
    return moment(unix).format('YYYY-MM-DD')
}
export const filterTimeDayN = (unix:number) =>{
    
    return moment(unix).format('YYYY-MM-DD')
}
export const filterMouth = (unix:number)=>{
   return moment(unix).format('YYYY-MM')
}

export const opTimeUnix = (time:string):number=>{

    return time?parseInt(moment(time).format('x')):parseInt(moment().format('x'))
}