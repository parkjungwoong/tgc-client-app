export interface UserInfo {
  custNo:string;
  id:string;
  name:string;
  email:string;
  password:string;
  joinDt:string;
  marketing:boolean;
  pushAgree:boolean;
  thirdPartyApp:Array<string>;
}
