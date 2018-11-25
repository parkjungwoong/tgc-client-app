import {Injectable} from "@angular/core";
import {ApiCall} from "../common/apiCall";
import {GameVO} from "../vo/gameVO";
import {Firebase} from "@ionic-native/firebase";
import {UserService} from "./userService";
import {Platform} from "ionic-angular";
import {CommonUtils} from "../common/commonUtils";
import {UserData} from "../datas/user-data";
import {SERVER} from "../const/SERVER";
import {AppVersion} from "@ionic-native/app-version";
//import {AdMob} from "ionic-admob";

@Injectable()
export class ComService {

  constructor(private apiCall:ApiCall
              ,private userService: UserService
              ,private commonUtil:CommonUtils
              ,private firebase: Firebase
              ,private userData: UserData
              ,private appVersion: AppVersion
              //,private admob: AdMob
              ,public platform: Platform){}

  /**
   * 회원 정보 갱신
   * @param userInfo 회원 정보
   * @returns {Promise<GameVO[]>}
   */
  getFireBaseToken(){
      /*this.firebase.getToken().then( token => {
        this.userData.checkAndGetUserInfo().then(_userInfo=>{
          if(_userInfo){
            let userInfo:UserInfo = {} as any;
            userInfo.userNo = _userInfo.userNo;
            userInfo.token = token;
            this.userService.updateInfo(userInfo,false);
          }
        });
      }).catch(error => console.error('Error getting token', error));

      this.firebase.onTokenRefresh().subscribe((token: string) => {
        this.userData.checkAndGetUserInfo().then(_userInfo=>{
          if(_userInfo){
            let userInfo:UserInfo = {} as any;
            userInfo.userNo = _userInfo.userNo;
            userInfo.token = token;
            this.userService.updateInfo(userInfo,false);
          }
        });
      });*/


  }

  subscibeNotiMsg(){
    this.firebase.onNotificationOpen().subscribe(data => {
      data.body ? this.commonUtil.showTostMsg(data.body).present() : '';
      console.log(JSON.stringify(data,null,2));
    });
  }

  /**
   * 앱 실행시 확인 로직
   */
  async checkAppInit(){

    //앱 init 데이터 수신
    let appVer = await this.appVersion.getVersionNumber();
    let url = this.commonUtil.margeUrlParam(SERVER.CHECK_INIT,[appVer]);

    let initData = await this.apiCall.get( url,false).catch(e =>{
      this.commonUtil.showAlert('','초기 데이터 로드에 실패하였습니다.');
    });

    if(!this.commonUtil.isEmpty(initData) && initData.upDateInfo){
      let meg = initData.upDateInfo.meg ? initData.upDateInfo.meg : '새로운 버전이 출시되었습니다.';
      this.commonUtil.showAlert('알림',meg).present();
    }
  }

  showAdmob(){
    try{
      //this.admob.banner.show({ id: "ca-app-pub-9880856608011876/4614337203" });
    } catch (e) {
      alert(JSON.stringify(e));
      console.error(e);
    }
  }
}
