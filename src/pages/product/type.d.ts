import {TPro} from '../tabPage/order/type'

export interface Tr {
	address: string
	codeId: number,
	goodsList:Array<TPro>
	id: number,
	money: number
}