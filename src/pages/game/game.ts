import { Component } from '@angular/core';
import {ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {GamesService} from "../../services/gamesService";
import {CommonUtils} from "../../common/commonUtils";

@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})
export class GamePage {

  game:any;

  constructor(public navCtrl: NavController
              ,public navParams: NavParams
              ,public viewCtrl: ViewController
              ,private modalCtrl: ModalController
              ,private gamesService: GamesService
              ,private commonUtil : CommonUtils
              ,params: NavParams) {
    this.game = params.get('game');
  }

  addGame(gameId:string){
    //todo : get userID
    this.gamesService.subscribe(gameId,'').then(val => {
      if(val){
        this.commonUtil.showAlert('구독 완료!','내 구독 리스트에서 확인해보세요.').present();
        this.dismiss();
      }
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
