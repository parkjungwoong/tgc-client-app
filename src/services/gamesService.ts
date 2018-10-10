import {Injectable} from "@angular/core";
import {ApiCall} from "../common/apiCall";
import {CommonUtils} from "../common/commonUtils";
import {Game} from "../vo/game";
import {SERVER} from "../const/SERVER";

@Injectable()
export class GamesService {

  constructor(
    private apiCall:ApiCall,
    private commonUtil:CommonUtils
  ){}

  /**
   * 구독 가능한 게임 조회
   * @param {string} stNum 페이징 시작 번호
   * @returns {Promise<Game[]>} 구독 가능 게임 목록
   */
  getList(stNum:string): Promise<Game[]> {
    let url = this.commonUtil.margeUrlParam(SERVER.GET_GAME_LIST,[stNum]);

    return this.apiCall.get( url
      ,true).then(value => {
        return value;
    }).catch( err => {
      return [];
    });
  }

  /**
   * 구독
   * @param {string} id 게임 아이디
   * @returns {Promise<boolean>} 성공 여부
   */
  addGame(id:string): Promise<boolean> {
    return this.apiCall.post( SERVER.ADD_MY_LIST
      ,{ "id" : id }
      ,true)
      .then(value => {
        return true;
      }).catch( err => {
        return false;
      });
  }

  /**
   * 구독 목록 조회
   * @param {string} stNum 페이징 시작 번호
   * @returns {Promise<any>} 구독 목록
   */
  getMyList(stNum:string): Promise<any> {
    let url = this.commonUtil.margeUrlParam(SERVER.GET_MY_LIST,[stNum]);

    return this.apiCall.get( url
      ,true).then(value => {
      return value;
    }).catch( err => {
      return [];
    });
  }
}
