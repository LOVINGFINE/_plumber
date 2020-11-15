import {_get,_post,_put} from '../services/request'

export const checkRegister = (data:{
    phone:string
})=>{
     return _post('/hydropower/login/phone',data)
}

export const getUserInfo = ()=>{
    return _get('/hydropower/login/user/info')
}

export const postCodeMessage = (code)=>{
     return _post(`/hydropower/login/code/outlets?code=${code}`)
}

export const getVerificationCode = (phone:string)=>{
    return _post('/hydropower/login/send/sms',{phone,type:7})
}