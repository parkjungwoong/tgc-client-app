import {Injectable} from "@angular/core";
import {ApiCall} from "../common/apiCall";
import {CommonUtils} from "../common/commonUtils";
import {Game} from "../vo/game";
import {SERVER} from "../const/SERVER";
import {COM_CONST} from "../const/COM_CONST";
import {Firebase} from "@ionic-native/firebase";
import {UserService} from "./userService";
import {Platform} from "ionic-angular";

@Injectable()
export class ComService {

  constructor(private apiCall:ApiCall
              ,private userService: UserService
              ,private firebase: Firebase
              ,public platform: Platform
  ){}

  /**
   * 회원 정보 갱신
   * @param userInfo 회원 정보
   * @returns {Promise<Game[]>}
   */
  getFireBaseToken(){
    if(!this.platform.is('mobileweb')) {
      this.firebase.getToken().then( token => {
        let userInfo:any = {
          id : 'test',
          device_token : token
        };

        this.userService.updateInfo(userInfo);
      }).catch(error => console.error('Error getting token', error));

      this.firebase.onTokenRefresh().subscribe((token: string) => {
        let userInfo:any = {
          id : 'test',
          device_token : token
        };
        this.userService.updateInfo(userInfo);
      });
    }
  }

}
