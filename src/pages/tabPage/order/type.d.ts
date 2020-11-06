export interface Ilist {
     id:number,
     name:string
     phone:string
     address:string
     pros:Array<TPro>
     pro_points:number
     installTime:string
} 

export interface TPro {
    name:string
    id:string
}

export interface Il {
    list:Array<Ilist>
}