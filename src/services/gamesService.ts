import {Injectable} from "@angular/core";
import {ApiCall} from "../common/apiCall";
import {CommonUtils} from "../common/commonUtils";
import {Game} from "../vo/game";
import {SERVER} from "../const/SERVER";
import {COM_CONST} from "../const/COM_CONST";

@Injectable()
export class GamesService {

  constructor(
    private apiCall:ApiCall,
    private commonUtil:CommonUtils
  ){}

  getList(stNum:string): Promise<Game[]> {

    return this.apiCall.request( SERVER.GET_GAME_LIST
      ,{ "stNum" : stNum }
      ,COM_CONST.HTTP_GET
      ,false).then(value => {
      let response = value[COM_CONST.COMMON_RES_RESULT];
      return response;
    }).catch( err => {
      return null;
    });
  }

  addGame(id:string): Promise<any> {
    return this.apiCall.request( SERVER.GET_GAME_LIST
      ,{ "stNum" : id }
      ,COM_CONST.HTTP_GET
      ,false).then(value => {
      let response = value[COM_CONST.COMMON_RES_RESULT];
      return response;
    }).catch( err => {
      return null;
    });
  }
}
