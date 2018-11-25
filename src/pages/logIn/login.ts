import { Component } from '@angular/core';
import {ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {UserService} from "../../services/userService";
import {UserData} from "../../datas/user-data";
import {regUserPage} from "../regUser/regUser";
import {CommonUtils} from "../../common/commonUtils";
import {NgForm} from "@angular/forms";
import {Facebook} from "@ionic-native/facebook";
import {COM_CONST} from "../../const/COM_CONST";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginInfo = {
    userNo:'',
    password: ''
  };

  isSubmit = false;
  appTitle = COM_CONST.APP_TITLE;

  constructor(public navCtrl: NavController
              ,public navParams: NavParams
              ,public viewCtrl: ViewController
              ,private userService: UserService
              ,private modalCtrl: ModalController
              ,private commonUtil:CommonUtils
              ,private fb: Facebook
              ,private userData: UserData) {

  }

  /**
   * 로그인
   */
  doLogin(form: NgForm){
    this.isSubmit = true;
    if (form.valid) {
      this.loginProc().then(value => {
        if(value) this.dismiss(value);
      });
    }
  }

  async fbLogin(){
    await this.userService.loginFaceBook().then(value => {
      if(value) this.dismiss(value);
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
