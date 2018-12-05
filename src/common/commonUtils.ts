import { Injectable } from '@angular/core';
import {AlertController, LoadingController, ToastController} from "ionic-angular";
import {TConst} from "../const/TConst";
import {EmailComposer} from "@ionic-native/email-composer";
import {AppVersion} from "@ionic-native/app-version";
import {Device} from "@ionic-native/device";

@Injectable()
export class CommonUtils {

  constructor(
    private alertCtrl: AlertController
    ,private loadingCtrl: LoadingController
    ,private toastCtrl: ToastController
    ,private emailComposer: EmailComposer
    ,private appVersion: AppVersion
    ,private device: Device
  ){

  }

  /**
   * 알럿창 출력
   * ex) showAlert.present();
   * @param {string} title
   * @param {string} message
   */
  showAlert(title:string,message:string) {

    if(title == '') title = TConst.CONST.ALERT_TITLE;

    return this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['확인']
    });
  }

  showAlertPromise(meg): Promise<boolean> {
    return new Promise((resolve, reject) => {

      let alert = this.alertCtrl.create({
        message: meg,
        buttons: [{
          text: '확인',
          handler: () => {
            alert.dismiss().then(() => { resolve(true); });
            return false;
          }
        }]
      });
      alert.present();
    });
  }

  /**
   * 로딩 출력
   * ex) showLoading.present();
   * @param {string} loadingMessage 로딩 메시지
   */
  showLoading(loadingMessage:string) {

    if(loadingMessage == '') loadingMessage = TConst.CONST.LOADING_DEFAULT_MESSAGE;

    return this.loadingCtrl.create({
      content: loadingMessage
    });
  }

  /**
   * JSON => QueryString
   * @param jsonObj JSON value
   * @returns {string} QueryString
   */
  jsonToQueryString(jsonObj:any):string {

    return '?' +
      Object.keys(jsonObj).map(function(key) {
        return encodeURIComponent(key) + '=' +
          encodeURIComponent(jsonObj[key]);
      }).join('&');
  }

  /**
   * URL 파라미터 생성
   * @param {SERVER} url 요청 URl
   * @param {string[]} param 파라미터
   * @returns {string} url
   */
  margeUrlParam(url:string,param:string[]):string {
    let result:string = url;
    param.forEach(val => {
      result = result.replace(TConst.CONST.URL_PARAM_MARK,val);
    });

    return result;
  }

  /**
   * 페이징 쿼리 추가 예) /record?offset=100&limit=25 100번째 부터 25개
   * @param {number} offset 시작 번호
   * @param {string} limit  최대 개수
   * @returns {string} 페이징 쿼리스트링
   */
  getPagingQuery(offset:number,limit:string):string{
    if(this.isEmpty(limit)) limit = TConst.CONST.LIMIT+'';
    return '?offset='+offset+'&limit='+limit;
  }

  isEmpty(obj:any):boolean {

    if(typeof obj === 'string'){
      return obj.length == 0 || obj == '';
    } else {
      return obj === undefined || obj == null;
    }
  }

  getRandomNum(count:number):number {
    let result:string = '';

    for(let i=0; i<count; i++){
      let num:string = Math.floor((Math.random() * 10) + 1)+'';
      result += num;
    }

    return Number(result);
  }

  showTostMsg(message:string){
    return this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
  }

  openTabBrower(url:string){
    //todo: 브라우저 탭으로 변경하기 - 코드로바7지원하는거 나오
    window.open(url, '_system', 'location=yes');
  }

  async sendMail(emailAddr){

    let appVer = await this.appVersion.getVersionNumber();
    let body = '기종:'+this.device.model+'\n기기OS:'+this.device.platform+'\n기기OS ver:'+this.device.version+'\n앱 ver:'+appVer+'\n증상 :';

    let email = {
      to: emailAddr,
      cc: '',
      bcc: [],
      attachments: [
      ],
      subject: '[게임 퀵마크] 이용 문의',
      body: body,
      isHtml: true
    };

    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        this.emailComposer.open(email);
      } else {
        this.showAlert('','이메일 실행에 실패하였습니다.\n'+emailAddr+'로 보내주세요.').present();
      }
    });
  }


  /**
   * 전체 페이지 개수 반환
   * @param {number} totalCnt 전체 개수
   * @param {number} size 페이징 사이즈
   * @returns {number} 전체 페이지 개수
   */
  getTotalPageCnt(totalCnt:number, size:number):number {
    return totalCnt/size + totalCnt%size != 0 ? 1 : 0;
  }

  /**
   * 마지막 페이지 체크
   * @param {number} totalPageCnt 전체 페이지 수
   * @param {number} curPage 현재 페이지
   * @returns {boolean} true 마지막 페이지
   */
  isLastPage(totalPageCnt:number,curPage:number):boolean {
    return totalPageCnt>curPage ? false : true;
  }

  /**
   * 날짜 종료일 체크
   * @param {string} enDt 검사할 날짜
   * @returns {boolean} 종료일 지났으면 false
   */
  checkEndDate(enDt:string):boolean {

    return false;
  }






}
