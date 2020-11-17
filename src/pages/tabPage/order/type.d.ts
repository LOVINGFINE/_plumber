export interface Ilist {
    address: string
	goodsList: TPro[],
	hyName: string
	hyPhone: string
	hyUserId: number,
	id: number,
	installStatus: number,
	money: number,
	name: string
	orderCreateTime: number,
	orderUpdateTime: number,
	outletsId: number,
	outletsName: string
	phone: string
} 

export interface TPro {
    bcn: string
	code: string
	ct: number,
	name: string,
	pr: number,
	scn: string
}
