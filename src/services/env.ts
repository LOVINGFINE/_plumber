import Taro from '@tarojs/taro'

export const ACCESS_TOKEN = Taro.getStorageSync('token') || ''
export default 'https://shuidian.oupu.lcwing.com'