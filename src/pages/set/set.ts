import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, ViewController} from 'ionic-angular';
import {UserInfo} from "../../vo/userInfo";
import {UserData} from "../../datas/user-data";
import {UserService} from "../../services/userService";
import {CommonUtils} from "../../common/commonUtils";
import {COM_CONST} from "../../const/COM_CONST";
import {SERVER} from "../../const/SERVER";

@Component({
  selector: 'page-set',
  templateUrl: 'set.html'
})
export class SetPage {

  userInfo:UserInfo;

  constructor(public navCtrl: NavController
              ,public navParams: NavParams
              ,private userData: UserData
              ,private userService: UserService
              ,public viewCtrl: ViewController
              ,private commonUtil:CommonUtils
              ,public alertCtrl: AlertController
              ,params: NavParams) {
    this.userInfo = params.get('userInfo');
    this.userInfo.setInfo.pushAgree = !this.commonUtil.isEmpty(this.userInfo.setInfo.pushAgree);
    this.userInfo.setInfo.marketing = !this.commonUtil.isEmpty(this.userInfo.setInfo.marketing);
  }

  //약관 페지이 보여줌
  openWeb(){
    this.commonUtil.openTabBrower(SERVER.SERVER_URL+SERVER.SERVICE_RULE_LINK);
  }

  //메일 문의
  sendMail(){
    this.commonUtil.sendMail(COM_CONST.GROUP_MAIL).then();
  }

  //권한 설정
  authSet(type){
    let updateUserInfo:UserInfo = {} as any;
    updateUserInfo.setInfo = {} as any;
    updateUserInfo.userNo = this.userInfo.userNo;

    if(type == 'push'){
      updateUserInfo.setInfo.pushAgree = this.userInfo.setInfo.pushAgree;
    } else {
      updateUserInfo.setInfo.marketing = this.userInfo.setInfo.marketing;
    }
    this.userService.updateInfo(updateUserInfo,true).then(value => {
      if(value) this.commonUtil.showAlert('회원 정보 수정','변경 처리되었습니다.');
    });
  }

  //로그 아웃
  logout(){
    this.userData.logout();
    this.commonUtil.showAlert('알림','로그아웃 되었습니다.');
    //todo: 페이지 이동 처리
  }

  //탈퇴
  unRegUser(){
    const confirm = this.alertCtrl.create({
      title: '회원 탈퇴',
      message: '정말 탈퇴하시겠습니까?',
      buttons: [
        {
          text: '회원 유지',
          handler: () => {
          }
        },
        {
          text: '정말 탈퇴',
          handler: () => {
            this.logout();
            this.userService.deleteUser(this.userInfo.userNo).then(val => {
              if(val) {
                this.commonUtil.showAlert('회원 탈퇴','그동안 이용해 주셔서 감사합니다.').present();
                //todo: 로그아웃 후 페이지 이동 처리
              }
            });
          }
        }
      ]
    });
    confirm.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
