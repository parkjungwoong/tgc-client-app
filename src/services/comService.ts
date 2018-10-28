import {Injectable} from "@angular/core";
import {ApiCall} from "../common/apiCall";
import {GameVO} from "../vo/gameVO";
import {Firebase} from "@ionic-native/firebase";
import {UserService} from "./userService";
import {Platform} from "ionic-angular";
import {CommonUtils} from "../common/commonUtils";

@Injectable()
export class ComService {

  constructor(private apiCall:ApiCall
              ,private userService: UserService
              ,private commonUtil:CommonUtils
              ,private firebase: Firebase
              ,public platform: Platform){}

  /**
   * 회원 정보 갱신
   * @param userInfo 회원 정보
   * @returns {Promise<GameVO[]>}
   */
  getFireBaseToken(){

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

      this.firebase.onNotificationOpen().subscribe(data => {

        //todo : 노티 수신시 처리
        console.log(JSON.stringify(data,null,2));
        alert(JSON.stringify(data,null,2));

        if(data.wasTapped){
          console.log("Received in background");
        } else {
          console.log("Received in foreground");
        };
      });
  }

}
