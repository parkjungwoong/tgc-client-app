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
    this.gamesService.getList(stNum+'').then(value => {
      console.log(value);
      value.forEach(item => {
        this.games.push(item);
      });
    });
  }

  addGame(id:string){

    this.commonUtil.showAlert('알림','구독 완료!');

  }

}
