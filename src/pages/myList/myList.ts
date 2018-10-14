import { Component } from '@angular/core';
import {AlertController, Events, ModalController, NavController} from 'ionic-angular';
import {GamesService} from "../../services/gamesService";
import {CommonUtils} from "../../common/commonUtils";
import {UserData} from "../../datas/user-data";
import {LoginPage} from "../logIn/login";

@Component({
  selector: 'page-myList',
  templateUrl: 'myList.html'
})
export class MyListPage {

  subscribeList: Array<{gameName: string, gameId: string, img: string, regDt: string, isNew: boolean}> = [];

  constructor(public navCtrl: NavController
              ,public alertCtrl: AlertController
              ,public gamesService: GamesService
              ,public commonUtil:CommonUtils
              ,private modalCtrl: ModalController
              ,private userData:UserData
              ,private events: Events
  ) {
    //로그인 체크
    this.userData.hasLoggedIn().then(isLogin => {
      if(isLogin){
        this.getMySubscribe('1');
      } else {
        this.showLogin();
      }
    });

    this.events.subscribe('user:login', value => {
      this.getMySubscribe('1');
    });

    this.events.subscribe('user:logout', value => {
      this.subscribeList = [];
    });
  }

  //구독 리스트 가져오기
  getMySubscribe(stNum:string){
    this.gamesService.getMyList('userId',stNum).then(val => {
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
}
