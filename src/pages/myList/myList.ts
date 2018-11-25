import { Component } from '@angular/core';
import {AlertController, Events, ModalController, NavController} from 'ionic-angular';
import {GamesService} from "../../services/gamesService";
import {CommonUtils} from "../../common/commonUtils";
import {UserData} from "../../datas/user-data";
import {LoginPage} from "../logIn/login";
import {UserInfo} from "../../vo/userInfo";
import {UserService} from "../../services/userService";
import {COM_CONST} from "../../const/COM_CONST";
import {SetPage} from "../set/set";
import {GameVO} from "../../vo/gameVO";

@Component({
  selector: 'page-myList',
  templateUrl: 'myList.html'
})
export class MyListPage {

  userInfo:UserInfo = {} as any;

  subscribeList:Array<GameVO>;
  messageList:Array<any>;
  segmentType:number;
  userPhoto:string;

  constructor(public navCtrl: NavController
              ,public alertCtrl: AlertController
              ,public gamesService: GamesService
              ,public userService: UserService
              ,public commonUtil:CommonUtils
              ,private modalCtrl: ModalController
              ,private userData:UserData
              ,private events: Events) {

    this.segmentType = COM_CONST.SEGMENT_TYPE_SUBSCRIBE;

    this.initMyList();

    this.events.subscribe('user:login', value => {
      //todo : [버그] 로그인시 login 이벤트가 두번 발생하는 문제점 있음
      this.initMyList();
    });

    this.events.subscribe('user:logout', value => {
      this.subscribeList = [];
      this.messageList = [];
    });
  }

  async initMyList(){
    let userInfo = await this.userData.checkAndGetUserInfo();

    if(userInfo != null) {
      this.userInfo = userInfo;
      this.subscribeList = await this.gamesService.getMyList(this.userInfo.userNo,0);
      this.messageList = await this.userService.getMessageList(this.userInfo.userNo,0);
      //todo: 리펙토링 대상
      console.log('userInfo',JSON.stringify(this.userInfo));
      if(this.userInfo.thirdPartyLinkApp == COM_CONST.FACEBOOK){
        let fbUserID = this.userInfo.userNo.substring(1,this.userInfo.userNo.length);
        this.userPhoto = this.commonUtil.margeUrlParam(COM_CONST.FACEBOOK_PHOTO_LINK,[fbUserID]);
        console.log('phto',this.userPhoto);
      }

    } else {
      this.modalCtrl.create(LoginPage).present();
    }
  }

  //구독 취소하기
  delMySubscribe(gameInfo:GameVO){

    const confirm = this.alertCtrl.create({
      title: '구독 취소',
      message: gameInfo.name+'에 대한 구독을 취소하시겠습니까?',
      buttons: [
        {
          text: '구독 유지',
          handler: () => {
          }
        },
        {
          text: '구독 취소',
          handler: () => {
            this.gamesService.delSubscribe(this.userInfo.userNo, gameInfo._id).then(val => {
              if(val){
                this.commonUtil.showAlert('구독 취소','굿 바이 '+gameInfo.name).present();
                this.subscribeList.splice(this.subscribeList.indexOf(gameInfo),1);
              }
            });
          }
        }
      ]
    });
    confirm.present();
  }

  //설정 화면
  showSetPage(){
    this.modalCtrl.create(SetPage,{userInfo:this.userInfo}).present();
  }

}
