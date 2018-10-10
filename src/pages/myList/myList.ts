import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {GamesService} from "../../services/gamesService";
import {Game} from "../../vo/game";
import {CommonUtils} from "../../common/commonUtils";

@Component({
  selector: 'page-myList',
  templateUrl: 'myList.html'
})
export class MyListPage {

  constructor(public navCtrl: NavController
              ,public gamesService: GamesService
              ,public commonUtil:CommonUtils) {

  }

}
