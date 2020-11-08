export default (list:Array<any>)=>{
    for(let i = 0;i<=list.length;i++){
       if(list[i]===''){
          return i
       }
    }
}