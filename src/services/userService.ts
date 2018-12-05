import {Injectable} from "@angular/core";
import {ApiCall} from "../common/apiCall";
import {CommonUtils} from "../common/commonUtils";
import {GameVO} from "../vo/gameVO";
import {TConst} from "../const/TConst";
import {UserInfo} from "../vo/userInfo";
import {LoginPage} from "../pages/logIn/login";
import {UserData} from "../datas/user-data";
import {Facebook, FacebookLoginResponse} from "@ionic-native/facebook";
import {ModalController} from "ionic-angular";
import {Device} from "@ionic-native/device";
import {AppVersion} from "@ionic-native/app-version";
import {Firebase} from "@ionic-native/firebase";

@Injectable()
export class UserService {

  constructor(
    private apiCall:ApiCall
    ,private commonUtil:CommonUtils
    ,private userData:UserData
    ,private fb: Facebook
    ,private modalCtrl: ModalController
    ,private device: Device
    ,private appVersion: AppVersion
    ,private firebase: Firebase
  ){}


  /**
   * 로그인
   * @param userInfo
   * @returns {Promise<any>}
   */
  login(userInfo:any): Promise<UserInfo> {
    return this.apiCall.post( TConst.SERVER.LOGIN, userInfo,true).then(value => {
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
    return this.apiCall.post( TConst.SERVER.USER_ADD
      , userInfo
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
  updateInfo(userInfo:UserInfo, isLoading:boolean): Promise<any> {
    let url = this.commonUtil.margeUrlParam(TConst.SERVER.USER_UPDATE,[userInfo.userNo]);

    return this.apiCall.put( url
      ,userInfo
      ,isLoading).then(value => {
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
    let url = this.commonUtil.margeUrlParam(TConst.SERVER.GET_MESSAGE_LIST,[userNo]);
    url += this.commonUtil.getPagingQuery(offset,'10');

    return this.apiCall.get( url,true).then(value => {
      return value;
    }).catch( err => {
      return false;
    });
  }

  /**
   * 탈퇴
   * @param {string} userNo 회원 번호
   * @returns {Promise<any>}
   */
  deleteUser(userNo:string): Promise<any> {
    return this.apiCall.delete( TConst.SERVER.USER_DEL,{ userNo: userNo},true).then(value => {
      return value;
    }).catch( err => {
      return false;
    });
  }

  /**
   * 외부 연동 로그인
   * @param userInfo
   * @returns {Promise<any>}
   */
  thirdPartyLogin(userInfo:UserInfo): Promise<any> {
    return this.apiCall.post( TConst.SERVER.THIRD_PARTY_LOGIN
      , userInfo
      ,true).then(value => {
      return value;
    }).catch( err => {
      return false;
    });
  }

  //todo : 리펙토링 대상
  /**
   * 앱실행시 로그인 상태 체크
   * @returns {Promise<any>}
   */
  async checkLoginStatus():Promise<any>{
    let userInfo = await this.userData.checkAndGetUserInfo();

    if(!this.commonUtil.isEmpty(userInfo)){
      //소셜 로그인 만료 체크
      let type = userInfo.thirdPartyLinkApp;

      if(type == TConst.CONST.FACEBOOK){
        let fbRes = await this.fb.getLoginStatus();

        if(fbRes.status != 'connected'){
          this.userData.logout();
          this.commonUtil.showAlert('로그인 만료','다시 로그인 해주세요.').present();
          this.modalCtrl.create(LoginPage).present();
        } else {
          console.log('fbRes',JSON.stringify(fbRes,null,2));
          let udateUserInfo:UserInfo = {} as any;

          udateUserInfo.userNo = userInfo.userNo;

          udateUserInfo.device = {} as any;
          udateUserInfo.device.osType = this.device.platform;
          udateUserInfo.device.osVer = this.device.version;
          udateUserInfo.device.appVer = await this.appVersion.getVersionNumber();

          udateUserInfo.token = await this.firebase.getToken();

          await this.updateInfo(udateUserInfo,false);
        }
      }
    }
  }

  /**
   * 페이스북 로그인
   * @returns {Promise<UserInfo>}
   */
  async loginFaceBook(): Promise<UserInfo> {
    let userInfo:UserInfo = {} as any;
    userInfo.thirdPartyLinkApp = TConst.CONST.FACEBOOK;

    let fbRes = await this.fb.getLoginStatus();
    console.log('getLoginStatus',JSON.stringify(fbRes));

    if(fbRes.status != 'connected'){
      console.log('first FB');
      let fbLoginRes: FacebookLoginResponse = await this.fb.login(['public_profile', 'email']).catch( e => {
        console.log('fail facebook login', JSON.stringify(e));
        this.commonUtil.showAlert('','페이스북 연동에 실패하였습니다.').present();
        return null;
      });
      userInfo.thirdPartyLinkInfo = fbLoginRes;
    } else {
      console.log('already FB');
      userInfo.thirdPartyLinkInfo = fbRes;
    }

    let fbUserInfo = await this.fb.api('/me',["public_profile"]);
    console.log('api FB', JSON.stringify(fbUserInfo));
    userInfo.name = fbUserInfo.name;
    userInfo.setInfo = {
      marketing:true
      ,pushAgree:true
    };
    userInfo.token = await this.firebase.getToken();

    let finalUserInfo = await this.thirdPartyLogin(userInfo).catch(e=>{
      console.error('회원가입 에러',JSON.stringify(e));
      return null;
    });

    if(finalUserInfo){
      this.userData.insertLoginInfo(finalUserInfo)
    } else {
      return null;
    }
    return finalUserInfo;
  }
}
