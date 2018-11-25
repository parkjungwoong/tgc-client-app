export interface eventVO {
  stDt:number;
  enDt:number;
  title:string;
  titleColor:string;
  rowRange:number;
  isHide:boolean;
  _id:string;
  gameInfo:{
    _id:string,
    name:string
  };
  url:string;
}
