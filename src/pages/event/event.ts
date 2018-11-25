import { Component } from '@angular/core';
import {ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {GamesService} from "../../services/gamesService";
import {CommonUtils} from "../../common/commonUtils";
import {UserData} from "../../datas/user-data";
import {LoginPage} from "../logIn/login";
import {BrowserTab} from "@ionic-native/browser-tab";
import {eventVO} from "../../vo/eventVO";

@Component({
  selector: 'page-event',
  templateUrl: 'event.html'
})
export class EventPage {
  eventInfo:eventVO;//이벤트 내용
  game:any;//게임 정보
  remindOpt:Array<any> = [];

  constructor(public navCtrl: NavController
              ,public navParams: NavParams
              ,public viewCtrl: ViewController
              ,private modalCtrl: ModalController
              ,private gamesService: GamesService
              ,private commonUtil : CommonUtils
              ,private userData:UserData
              ,private browserTab: BrowserTab
              ,params: NavParams) {
    //부모 창으로 부터  정보 받아서 뷰에 표기
    this.game = params.get('game');
    this.eventInfo = params.get('eventInfo');
    this.remindOpt.push(0);//todo : 이벤트 정보에서 이전 설정값 받아오기
  }

  //사용자 알림 추가
  async addRemind(){
    this.commonUtil.showAlert('','곧 기능이 추가됩니다!').present();
    //todo: 기능 완성 하기
    /*
    let userInfo = await this.userData.checkAndGetUserInfo();
    if(userInfo != null) {
      let isSc = await this.gamesService.addRemind(userInfo.userNo,this.eventInfo._id,this.remindOpt);
      if(isSc){
        this.commonUtil.showAlert('구독 완료!','내 구독 리스트에서 확인해보세요.').present();
        this.dismiss();
      }
    } else {
      this.modalCtrl.create(LoginPage).present();
    }*/
  }

  openWeb(url){
    this.commonUtil.openTabBrower(url);
  }

  //todo: 공유하기
  share(gameId:string){

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
