import {Injectable} from "@angular/core";
import {ApiCall} from "../common/apiCall";
import {Firebase} from "@ionic-native/firebase";
import {UserService} from "./userService";
import {AlertController, ModalController, Platform} from "ionic-angular";
import {CommonUtils} from "../common/commonUtils";
import {UserData} from "../datas/user-data";
import {TConst} from "../const/TConst";
import {AppVersion} from "@ionic-native/app-version";
import {AdMob} from "ionic-admob";
import {Device} from "@ionic-native/device";
import {initDataVO} from "../vo/initDataVO";
import {BannerPage} from "../pages/banner/banner";

@Injectable()
export class ComService {

  constructor(private apiCall:ApiCall
              ,private userService: UserService
              ,private commonUtil:CommonUtils
              ,private firebase: Firebase
              ,private userData: UserData
              ,private appVersion: AppVersion
              ,private device: Device
              ,private admob: AdMob
              ,public alertCtrl: AlertController
              ,private modalCtrl: ModalController
              ,public platform: Platform){

  }

  /**
   * 푸시 알림
   */
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
    let appVer:string = await this.appVersion.getVersionNumber();
    let os = await this.device.platform;

    let initData = await this.selectInitData(os,appVer);

    if(!this.commonUtil.isEmpty(initData) && initData.upDateInfo.isNew){
      let meg = initData.upDateInfo.meg ? initData.upDateInfo.meg : '새로운 버전이 출시되었습니다.';

      if(initData.upDateInfo.isNecessary){
        let alertF = await this.commonUtil.showAlertPromise(meg);
        alertF ? this.commonUtil.openTabBrower(initData.upDateInfo.appLink) : '';
        this.platform.exitApp();
      } else {
        const confirm = this.alertCtrl.create({
          title: '알림',
          message: meg,
          buttons: [
            {
              text: '다음에 업데이트',
              handler: () => {
              }
            },
            {
              text: '업데이트',
              handler: () => {
                this.commonUtil.openTabBrower(initData.upDateInfo.appLink);
              }
            }
          ]
        });
        confirm.present();
      }
    }

    let bannerData = initData.banner;

    if(!this.commonUtil.isEmpty(bannerData.type)){
      if(bannerData.type == TConst.CONST.BANNER_MODAL){
        this.modalCtrl.create(BannerPage,{bannerInfo:initData}).present();
      }
    }
  }

  async selectInitData(os:string,appVer:string): Promise<initDataVO>{
    console.log(os+' / '+appVer);
    let url = this.commonUtil.margeUrlParam(TConst.SERVER.CHECK_INIT,[os,appVer]);

    return this.apiCall.get( url,false).then(value => {
      return value;
    }).catch( err => {
      return false;
    });
  }

  /**
   * Admob 표시
   */
  async showBannerAd(){
    try{
      await this.platform.ready();
      //await this.admob.setDevMode(TConst.CONST.IS_DEV == "true);
      await this.admob.banner.show({ id: "ca-app-pub-9880856608011876/4614337203" });
    } catch (e) {
      console.error('showBannerAd',e);
      return false;
    }
    return true;
  }

  //전면 광고 표시
  async showInterstitialAd(){
    await this.platform.ready();
    await this.admob.interstitial.load({id:'ca-app-pub-9880856608011876/5396536458'});
    await this.admob.interstitial.show();
  }

  async hideAdmob(){
    await this.platform.ready();
    await this.admob.banner.hide();
  }
}
