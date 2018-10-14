import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {GamesService} from "../../services/gamesService";
import {Game} from "../../vo/game";
import {CommonUtils} from "../../common/commonUtils";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  games:Game[] = [];

  constructor(public navCtrl: NavController
              ,public gamesService: GamesService
              ,public commonUtil:CommonUtils) {
    this.getGameLst(1);
  }

  getGameLst(stNum:number){
    this.gamesService.getList(stNum+'').then(val => {
      val.forEach(item => {
        this.games.push(item);
      });
    });
  }

  addGame(gameId:string){
    //todo : get userID
    this.gamesService.subscribe(gameId,'').then(val => {
      if(val){
        this.commonUtil.showAlert('구독 완료!','내 구독 리스트에서 확인해보세요.').present();
      }
    });
  }

}
