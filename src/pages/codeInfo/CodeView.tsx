import React from 'react'
import {
  View,
  Image,
  Text,
  Button
} from '@tarojs/components'
import { code_success, code_error } from '@/assets/model'
import Empty from '@/components/empty'
import styles from './index.module.less'

export default ({
  iserror = false,
  errorDesc = '扫码失败',
  handleOk,
  handleCancel,
}: {
  iserror: boolean,
  errorDesc?: string,
  handleOk: () => void,
  handleCancel: () => void
}) => {
  return (<View className={styles.scanPage}>
    <View className={styles.ImagesWrap}>
      <Image src={iserror ? code_error : code_success} className={styles.scanIcon} />
      <Empty isShow={iserror} empty_ele={
        <Text className={styles.successDesc}>{'二维码识别成功'}</Text>
      }>
        <View className={styles.failedWrap}>
          <Text className={styles.desc}>{'二维码识别失败'}</Text>
          <Text className={styles.failedDesc}>{errorDesc}</Text>
        </View>
      </Empty>
    </View>
    <View className={styles.buttonWrap}>
      <Button className={styles.btn} onClick={handleCancel}>{
        iserror ? '取消' : '查看详情'
      }</Button>
      <View style={{ width: '30px' }}></View>
      <Button className={styles.btn} style={{ backgroundColor: '#003BA5', color: '#fff' }} onClick={handleOk}>{iserror ? '重新扫码' : '继续扫码'}</Button>
    </View>
  </View>)
}
