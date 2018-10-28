import { Component } from '@angular/core';
import {ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {UserService} from "../../services/userService";
import {UserData} from "../../datas/user-data";
import {regUserPage} from "../regUser/regUser";
import {CommonUtils} from "../../common/commonUtils";

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
              ,private commonUtil:CommonUtils
              ,private userData: UserData) {

  }

  /**
   * 로그인
   */
  doLogin(){
    //todo : validation

    this.loginProc().then(value => {
      value ? this.dismiss(value) : this.commonUtil.showAlert('알림','로그인 실패').present();
    });
  }

  async loginProc(){
    let userInfo = await this.userService.login(this.loginInfo);//로그인 요청
    return userInfo ? await this.userData.insertLoginInfo(userInfo) : userInfo;
  }

  /**
   * 회원가입 모달
   */
  regUserModal(){
    this.viewCtrl.dismiss();
    this.modalCtrl.create(regUserPage).present();
  }

  dismiss(flag) {
    this.viewCtrl.dismiss(flag);
  }
}
