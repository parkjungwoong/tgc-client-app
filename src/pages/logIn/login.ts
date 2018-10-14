import { Component } from '@angular/core';
import {ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {UserService} from "../../services/userService";
import {UserData} from "../../datas/user-data";
import {regUserPage} from "../regUser/regUser";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginInfo:any = {
    id:'',
    password: ''
  };

  constructor(public navCtrl: NavController
              ,public navParams: NavParams
              ,public viewCtrl: ViewController
              ,private userService: UserService
              ,private modalCtrl: ModalController
              ,private userData: UserData
  ) {

  }

  /**
   * 로그인
   */
  doLogin(){
    //todo : validation
    //todo : 파라미터 값 interface로 변경
    this.userService.login({}).then(val => {
      this.userData.insertLoginInfo(val);
      this.viewCtrl.dismiss(true);
    });
  }

  /**
   * 회원가입 모달
   */
  regUserModal(){
    this.viewCtrl.dismiss();
    this.modalCtrl.create(regUserPage).present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
