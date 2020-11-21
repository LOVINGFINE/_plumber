import {TPro} from '../tabPage/order/type'

export interface Tr {
	address: string
	codeId: number,
	phone:string
	goodsList:Array<TPro>
	id: number,
	money: number,
	ownerName:string,
	ownerPhone:string
}