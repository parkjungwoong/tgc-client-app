import { Component } from '@angular/core';
import { NavController, NavParams, ViewController} from 'ionic-angular';
import {initDataVO} from "../../vo/initDataVO";

@Component({
  selector: 'page-banner',
  templateUrl: 'banner.html'
})
export class BannerPage {

  bannerInfo:initDataVO;

  constructor(public navCtrl: NavController
              ,public navParams: NavParams
              ,public viewCtrl: ViewController
              ,params: NavParams) {
    this.bannerInfo = params.get('bannerInfo');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
}
