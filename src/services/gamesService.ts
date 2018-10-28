import {Injectable} from "@angular/core";
import {ApiCall} from "../common/apiCall";
import {CommonUtils} from "../common/commonUtils";
import {GameVO} from "../vo/gameVO";
import {SERVER} from "../const/SERVER";
import {eventVO} from "../vo/eventVO";

@Injectable()
export class GamesService {

  constructor(
    private apiCall:ApiCall,
    private commonUtil:CommonUtils){}

  /**
   * 게임 조회
   * @param {string} gameId
   * @returns {Promise<any>}
   */
  selectGameInfo(gameId:string): Promise<any> {

    let url = this.commonUtil.margeUrlParam(SERVER.SEARCH_GAME,['gameId='+gameId]);

    return this.apiCall.get( url,true).then(value => {
      return value;
    }).catch( err => {
      return false;
    });
  }

  /**
   * 게임 리스트 조회
   * @param {string} stNum 페이징 시작 번호
   * @returns {Promise<GameVO[]>} 구독 가능 게임 목록
   */
  getList(stNum:string): Promise<GameVO[]> {
    let url = this.commonUtil.margeUrlParam(SERVER.GET_GAME_LIST,[stNum]);

    return this.apiCall.get( url,true).then(value => {
      return value;
    }).catch( err => {
      return [];
    });
  }

  /**
   * 구독 중인 게임 조회
   * @param {string} userNo 회원 고유 번호
   * @param {number} offset 페이징 시작 번호
   * @returns {Promise<any>} 구독 목록
   */
  getMyList(userNo:string,offset:number): Promise<any> {
    //todo : 페이징 추가하기 예) /record?offset=100&limit=25 100번째 부터 25개
    let url = this.commonUtil.margeUrlParam(SERVER.GET_MY_SUBSCRIBE,[userNo]);

    return this.apiCall.get( url,true).then(value => {
      return value;
    }).catch( err => {
      return false;
    });
  }

  /**
   * 게임 이벤트 조회
   */
  getGameEvent(gameId:string,offset:number):Promise<any> {
    //todo : 페이징 추가하기 예) /record?offset=100&limit=25 100번째 부터 25개
    let url = this.commonUtil.margeUrlParam(SERVER.GET_GAME_EVENT,[gameId]);

    return this.apiCall.get( url,true).then(value => {
      return value;
    }).catch( err => {
      return false;
    });
  }

  /**
   * 구독 중인 게임 이벤트 조회
   */
  getMyEvent(userId:string,offset:number):Promise<eventVO[]> {
    //todo : 페이징 추가하기 예) /record?offset=100&limit=25 100번째 부터 25개
    let url = this.commonUtil.margeUrlParam(SERVER.GET_MY_EVENT,[userId]);

    return this.apiCall.get( url,true).then(value => {
      return value;
    }).catch( err => {
      return false;
    });
  }

  /**
   * 구독
   * @param {string} gameId 게임 아이디
   * @param {string} userNo 회원 고유 번호
   * @returns {Promise<boolean>} 성공 여부
   */
  subscribe(gameId:string,userNo:string): Promise<boolean> {
    return this.apiCall.post( SERVER.ADD_SUBSCRIBE
      ,{ "gameId" : gameId,"userNo" : userNo }
      ,true)
      .then(value => {
        return true;
      }).catch( err => {
        return false;
      });
  }

  /**
   * 구독 취소
   * @param {string} userNo 회원 고유 번호
   * @param {string} gameId 게임 아이디
   * @returns {Promise<boolean>} 성공 여부
   */
  delSubscribe(userNo:string,gameId:string): Promise<boolean> {
    return this.apiCall.post( SERVER.DEL_SUBSCRIBE
      ,{ "gameId" : gameId,"userNo" : userNo }
      ,true)
      .then(value => {
        return true;
      }).catch( err => {
        return false;
      });
  }

}
