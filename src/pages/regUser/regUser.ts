import { Component } from '@angular/core';
import {ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {UserService} from "../../services/userService";
import {LoginPage} from "../logIn/login";

@Component({
  selector: 'page-regUser',
  templateUrl: 'regUser.html'
})
export class regUserPage {

  loginInfo:any = {
    id:'',
    password: ''
  };

  constructor(public navCtrl: NavController
              ,public navParams: NavParams
              ,public viewCtrl: ViewController
              ,private userService: UserService
              ,private modalCtrl: ModalController
  ) {

  }

  /**
   * 회원가입
   */
  regUser(){
    //보류
    //todo: parameter interface로 변경
    //todo: validation 추가
    this.userService.regUser({}).then(val => {
      this.viewCtrl.dismiss();
      this.modalCtrl.create(LoginPage).present();
    });
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
}
