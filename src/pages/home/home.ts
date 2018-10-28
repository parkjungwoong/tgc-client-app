import { Component } from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {GamesService} from "../../services/gamesService";
import {GameVO} from "../../vo/gameVO";
import {CommonUtils} from "../../common/commonUtils";
import {LoginPage} from "../logIn/login";
import {GamePage} from "../game/game";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  games:GameVO[] = [];

  constructor(public navCtrl: NavController
              ,public gamesService: GamesService
              ,private modalCtrl: ModalController
              ,public commonUtil:CommonUtils) {
    this.getGameLst(1);
  }

  //게임 상세 보기
  showGameDetail(gameId:string){
    //todo: 게임 상세 정보 조회
    this.gamesService.selectGameInfo(gameId).then(value => {
      this.modalCtrl.create(GamePage,{game:value}).present();
    });

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
