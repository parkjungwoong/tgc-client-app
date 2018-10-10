import { Injectable } from '@angular/core';
import {AlertController, LoadingController} from "ionic-angular";
import {COM_CONST} from "../const/COM_CONST";
import {SERVER} from "../const/SERVER";

@Injectable()
export class CommonUtils {

  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ){

  }

  /**
   * 알럿창 출력
   * ex) showAlert.present();
   * @param {string} title
   * @param {string} message
   */
  showAlert(title:string,message:string) {

    if(title == '') title = COM_CONST.ALERT_TITLE;

    return this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['확인']
    });
  }

  /**
   * 로딩 출력
   * ex) showLoading.present();
   * @param {string} loadingMessage 로딩 메시지
   */
  showLoading(loadingMessage:string) {

    if(loadingMessage == '') loadingMessage = COM_CONST.LOADING_DEFAULT_MESSAGE;

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
  margeUrlParam(url:SERVER,param:string[]):string {
    let result:string = url;

    param.forEach(val => {
      result = result.replace(COM_CONST.URL_PARAM_MARK,val);
    });

    return result;
  }

  isEmpty(obj:any):boolean {

    if(typeof obj === 'string'){
      return obj.length == 0 || obj == '' ? true : false;
    } else {
      return obj === undefined || obj == null ? true : false;
    }

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
