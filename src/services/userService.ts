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
   * 회원 정보 갱신
   * @param userInfo 회원 정보
   * @returns {Promise<Game[]>}
   */
  updateInfo(userInfo:any): Promise<any> {
    let url = this.commonUtil.margeUrlParam(SERVER.USER_UPDATE,[userInfo.id]);

    return this.apiCall.put( url
      ,{ "device_token" : userInfo.device_token }
      ,false).then(value => {
      let response = value[COM_CONST.COMMON_RES_RESULT];
      return response;
    }).catch( err => {
      return null;
    });
  }

}
