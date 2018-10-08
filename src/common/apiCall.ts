import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import { UserData } from "../datas/user-data";
import { AlertController,LoadingController } from 'ionic-angular';
import {EatHttpMethod} from "./eatConst";
import 'rxjs/add/operator/toPromise';
import {CommonUtils} from "./commonUtils";
import {SERVER} from "../const/SERVER";
import {CODE} from "../const/CODE";
import {COM_CONST} from "../const/COM_CONST";

/**
 * API 서버 호출 공통 유틸
 */
@Injectable()
export class ApiCall {

  constructor(
    private http: HttpClient,
    private userData: UserData,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private commonUtils: CommonUtils
  ) {}

  /**
   * 로그인 필요없는 요청시
   * @param {string} url
   * @param params
   */
  request(url:string, params:any, httpMethod:COM_CONST, isShowLoading:boolean):Promise<any> {

    return new Promise((resolve, reject) => {

      let loader;

      if(isShowLoading) {
        loader = this.commonUtils.showLoading('');
      }

      params.appVer = ''; //todo : appVer, appOS 넣기
      params.appOs  = '';

      let errMsg:string = '잠시후 다시 시도해주세요.';

      const requestURL = SERVER.SERVER_URL + url;

      let request;

      // =========== HttpRequest 설정 START  ===========
      if(httpMethod == COM_CONST.HTTP_POST) {
        request = new HttpRequest(
          httpMethod, requestURL, params,
          {reportProgress: true},
        );

      } else {
        
        //POST 방식 아니면 쿼리 스트링으로 붙임
        let queryString:string = this.commonUtils.jsonToQueryString(params);

        request = new HttpRequest(
          httpMethod, requestURL+queryString,
          {reportProgress: true},
        );
      }
      // =========== HttpRequest 설정 END ===========

      // =========== 서버 요청 START ===========
      this.http.request(request).toPromise().then(res => {
        console.debug('===========response============',JSON.stringify(res,null,2));

        if(isShowLoading) loader.dismiss();

        let response = JSON.parse(JSON.stringify(res)).body;

        //응답 코드가 정상이 아니면 서버 에러 메시지 출력
        if(response[COM_CONST.COMMON_RES_CODE] != CODE.OK_CODE && isShowLoading) {
          this.commonUtils.showAlert('', response[COM_CONST.COMMON_RES_MSG] );
          reject(CODE.FAIL_CODE);
        } else {
          resolve(response);
        }

      },err => {

        console.debug('===========ERROR============',JSON.stringify(err,null,2));

        if(isShowLoading) loader.dismiss();

        this.commonUtils.showAlert('내부오류', errMsg );

        err[COM_CONST.COMMON_RES_CODE] = CODE.FAIL_CODE;

        reject(err);
      });
      // =========== 서버 요청 END ===========

    });
  }

  /**
   * 로그인 필요한 요청
   * @param {string} url
   * @param params
   */
  requestWithLogin(url:string, params:any, httpMethod:COM_CONST, showLoading:boolean): Promise<any> {
    console.log('================ requestWithLogin ===============');

    return this.userData.hasLoggedIn().then(hasLoggedIn =>{

      if(hasLoggedIn){

        return this.userData.getUserInfo().then(loginUserInfo =>{

          console.debug('requestWithLogin', JSON.stringify(loginUserInfo,null,2));
         /* params[EatConst.COMMON_LOGIN_TOKEN] = loginUserInfo[EatConst.COMMON_LOGIN_TOKEN];
          params[EatConst.COMMON_MEMBER_NO] = loginUserInfo[EatConst.COMMON_MEMBER_NO];*/

          return this.request(url, params, httpMethod, showLoading);
        });

      } else {

        this.commonUtils.showAlert('', '로그인이 필요합니다.' );

        return null;

      }
    });
  }
}
