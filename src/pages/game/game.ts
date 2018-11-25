import { Component } from '@angular/core';
import {ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {GamesService} from "../../services/gamesService";
import {CommonUtils} from "../../common/commonUtils";
import {UserData} from "../../datas/user-data";
import {LoginPage} from "../logIn/login";
import {GameVO} from "../../vo/gameVO";

@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})
export class GamePage {

  game:GameVO;

  constructor(public navCtrl: NavController
              ,public navParams: NavParams
              ,public viewCtrl: ViewController
              ,private modalCtrl: ModalController
              ,private gamesService: GamesService
              ,private commonUtil : CommonUtils
              ,private userData:UserData
              ,params: NavParams) {
    //부모 창으로 부터 게임 정보 받아서 뷰에 표기
    this.game = params.get('game');
    console.log(this.game);
  }

  //구독하기
  async addGame(){
    let userInfo = await this.userData.checkAndGetUserInfo();
    if(userInfo != null) {
      let isSc = await this.gamesService.subscribe(this.game._id,this.game.name,userInfo.userNo);
      if(isSc){
        this.commonUtil.showAlert('구독 완료!','내 구독 리스트에서 확인해보세요.').present();
        this.dismiss();
      }
    } else {
      this.modalCtrl.create(LoginPage).present();
    }
  }

  //todo: 공유하기
  share(gameId:string){

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
