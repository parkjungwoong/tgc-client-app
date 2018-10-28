import { Component } from '@angular/core';
import {AlertController, Events, ModalController, NavController} from 'ionic-angular';
import {GamesService} from "../../services/gamesService";
import {CommonUtils} from "../../common/commonUtils";
import {UserData} from "../../datas/user-data";
import {LoginPage} from "../logIn/login";
import {UserInfo} from "../../vo/userInfo";
import {UserService} from "../../services/userService";

@Component({
  selector: 'page-myList',
  templateUrl: 'myList.html'
})
export class MyListPage {

  userInfo:UserInfo = {
    custNo:''
    ,id:''
    ,name:'로그인이 필요합니다.'
    ,email:''
    ,password:''
  };
  subscribeList:Array<any>;
  messageList:Array<any>;
  segmentType:number;

  constructor(public navCtrl: NavController
              ,public alertCtrl: AlertController
              ,public gamesService: GamesService
              ,public userService: UserService
              ,public commonUtil:CommonUtils
              ,private modalCtrl: ModalController
              ,private userData:UserData
              ,private events: Events) {
    this.segmentType = 0;
    //로그인 체크
    this.userData.hasLoggedIn().then(isLogin => {
      if(isLogin){
        this.initMyList().then();
      } else {
        this.showLogin();
      }
    });

    this.events.subscribe('user:login', value => {
      this.initMyList().then();
    });

    this.events.subscribe('user:logout', value => {
      this.subscribeList = [];
    });
  }

  async initMyList(){
    this.userInfo = await this.userData.getUserInfo();
    console.log('userInfo',this.userInfo);
    this.subscribeList = await this.gamesService.getMyList(this.userInfo.custNo,1);
    this.messageList = await this.userService.getMessageList(this.userInfo.custNo,1);
  }

  //구독 리스트 가져오기
  getMySubscribe(stNum:number){
    this.gamesService.getMyList(this.userInfo.custNo, stNum).then(val => {
      if(val) {
        val.forEach( item => {
          this.subscribeList.push(item);
        });
      }
    });
  }

  //구독 취소하기
  delMySubscribe(gameInfo:any){

    const confirm = this.alertCtrl.create({
      title: '구독 취소',
      message: gameInfo.gameName+'에 대한 구독을 취소하시겠습니까?',
      buttons: [
        {
          text: '구독 유지',
          handler: () => {
          }
        },
        {
          text: '구독 취소',
          handler: () => {
            this.gamesService.delSubscribe('',gameInfo.gameId).then(val => {
              if(val){
                this.commonUtil.showAlert('구독 취소','굿 바이 '+gameInfo.gameNm);
                this.subscribeList.splice(this.subscribeList.indexOf(gameInfo),1);
              }
            });
          }
        }
      ]
    });
    confirm.present();
  }

  //로그인 모달 처리
  showLogin(){
    this.modalCtrl.create(LoginPage).present();
  }

  //todo : 설정 페이지 호출 Navigation 이용하기
}
