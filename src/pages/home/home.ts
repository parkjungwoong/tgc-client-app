import { Component } from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {GamesService} from "../../services/gamesService";
import {GameVO} from "../../vo/gameVO";
import {CommonUtils} from "../../common/commonUtils";
import {GamePage} from "../game/game";
import {COM_CONST} from "../../const/COM_CONST";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  games:GameVO[] = [];
  offset:number = 1;

  constructor(public navCtrl: NavController
              ,public gamesService: GamesService
              ,private modalCtrl: ModalController
              ,public commonUtil:CommonUtils) {
    this.gamesService.getList(this.offset).then(val => {
      this.games = val;
      if(this.games.length == 0) this.commonUtil.showAlert('안내','준비중입니다..').present();
    });
  }

  //게임 상세 보기
  showGameDetail(gameId:string){
    this.gamesService.selectGameInfo(gameId).then(value => {
      this.modalCtrl.create(GamePage,{game:value}).present();
    });
  }

  //더 보기
  async loadMore(infiniteScroll){
    this.offset += COM_CONST.LIMIT;
    let newList = await this.gamesService.getList(this.offset);

    if(newList.length == 0) infiniteScroll.enable(false);

    newList.forEach( game => {
      this.games.push(game);
    });

    infiniteScroll.complete();
  }
}
