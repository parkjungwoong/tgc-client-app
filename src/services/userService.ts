import {Injectable} from "@angular/core";
import {ApiCall} from "../common/apiCall";
import {CommonUtils} from "../common/commonUtils";
import {Game} from "../vo/game";
import {SERVER} from "../const/SERVER";
import {COM_CONST} from "../const/COM_CONST";

@Injectable()
export class UserService {

  constructor(
    private apiCall:ApiCall,
    private commonUtil:CommonUtils
  ){}


  /**
   * 로그인
   * @param userInfo
   * @returns {Promise<any>}
   */
  login(userInfo:any): Promise<any> {
    return this.apiCall.post( SERVER.LOGIN
      ,{ userInfo }
      ,true).then(value => {
      return value;
    }).catch( err => {
      return null;
    });
  }

  /**
   * 회원가입
   * @param userInfo
   * @returns {Promise<any>}
   */
  regUser(userInfo:any): Promise<any> {
    return this.apiCall.post( SERVER.USER_ADD
      ,{ userInfo }
      ,true).then(value => {
      return value;
    }).catch( err => {
      return false;
    });
  }

  /**
   * 회원 정보 갱신
   * @param userInfo 회원 정보
   * @returns {Promise<Game[]>}
   */
  updateInfo(userInfo:any): Promise<any> {
    let url = this.commonUtil.margeUrlParam(SERVER.USER_UPDATE,[userInfo.id]);

    return this.apiCall.put( url
      ,{ "device_token" : userInfo.device_token }
      ,false).then(value => {
      return value;
    }).catch( err => {
      return null;
    });
  }

}
