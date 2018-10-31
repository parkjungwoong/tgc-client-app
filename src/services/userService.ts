import {Injectable} from "@angular/core";
import {ApiCall} from "../common/apiCall";
import {CommonUtils} from "../common/commonUtils";
import {GameVO} from "../vo/gameVO";
import {SERVER} from "../const/SERVER";
import {UserInfo} from "../vo/userInfo";

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
  login(userInfo:{id,password}): Promise<UserInfo> {
    return this.apiCall.post( SERVER.LOGIN
      ,{ userInfo }
      ,true).then(value => {
      return value;
    }).catch( err => {
      return false;
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
   * @returns {Promise<GameVO[]>}
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

  /**
   * 메시지 조회
   * @param {string} userNo 회원 번호
   * @param {number} offset 페이징 시작 번호
   * @returns {Promise<any>} 메시지 정보
   */
  getMessageList(userNo:string,offset:number): Promise<any> {
    let url = this.commonUtil.margeUrlParam(SERVER.GET_MESSAGE_LIST,[userNo]);
    url += this.commonUtil.getPagingQuery(offset,'');

    return this.apiCall.get( url,true).then(value => {
      return value;
    }).catch( err => {
      return false;
    });
  }

  /**
   * 탈퇴
   * @param {string} custNo 회원 번호
   * @returns {Promise<any>}
   */
  deleteUser(custNo:string): Promise<any> {
    return this.apiCall.delete( SERVER.USER_DEL,{ custNo: custNo},true).then(value => {
      return value;
    }).catch( err => {
      return false;
    });
  }

}
