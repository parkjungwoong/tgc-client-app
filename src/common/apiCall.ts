import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpRequest} from '@angular/common/http';
import { UserData } from "../datas/user-data";
import {AlertController, LoadingController} from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import {CommonUtils} from "./commonUtils";
import {SERVER} from "../const/SERVER";
import {COM_CONST} from "../const/COM_CONST";

/**
 * API 서버 호출 공통 유틸
 */
@Injectable()
export class ApiCall {
  constructor(private http: HttpClient
              ,private userData: UserData
              ,private alertCtrl: AlertController
              ,private loadingCtrl: LoadingController
              ,private commonUtils: CommonUtils
  ){}

  get(url:string, isLoading:boolean): Promise<any>{
    let req = new HttpRequest( "GET", SERVER.SERVER_URL+url,{reportProgress: false} );
    return this.request(req, isLoading);
  }

  post(url:string, params:any, isLoading:boolean):Promise<any>{
    let req = new HttpRequest("POST", SERVER.SERVER_URL+url, params, {reportProgress: false} );
    return this.request(req, isLoading);
  }

  put(url:string, params:any, isLoading:boolean):Promise<any>{
    let req = new HttpRequest("PUT", SERVER.SERVER_URL+url, params, {reportProgress: false} );
    return this.request(req, isLoading);
  }

  delete(url:string, params:any, isLoading:boolean):Promise<any>{
    let req = new HttpRequest("DELETE", SERVER.SERVER_URL+url, params, {reportProgress: false} );
    return this.request(req, isLoading);
  }

  /**
   * HTTP request
   * @param {HttpRequest<any>} req
   * @param {boolean} isShowLoading
   * @returns {Promise<any>}
   */
  private request(req: HttpRequest<any>, isShowLoading:boolean): Promise<any>{
    let loading = this.commonUtils.showLoading('');

    isShowLoading ? loading.present() : loading.dismiss();

    return new Promise((resolve, reject) => {
      this.http.request(req)
        .subscribe(res=>{
          if (res.type === HttpEventType.Response) {
            let response = JSON.parse(JSON.stringify(res)).body;
            this.isResOKCode(response) ? resolve(this.getResult(response)) : this.errProce(response); reject();
          }
        },error=>{ loading.dismiss(); this.errProce(error); reject(); }
        ,()=>{
          loading.dismiss();
        });
    });
  }

  /**
   * 서버 처리 결과 검사
   * @param res 서버 응답값
   * @returns {boolean} 정상 처리면 true 반환
   */
  private isResOKCode(res:any):boolean {
    console.debug('===========RESPONSE============',JSON.stringify(res,null,2));
    let resCode = res[COM_CONST.COMMON_RES_CODE];
    return resCode == COM_CONST.OK_CODE;
  }

  /**
   * 서버 응답값에서 result 반환
   * @param res 서버 응답값
   * @returns {any} result값
   */
  private getResult(res:any):any {
    return res[COM_CONST.COMMON_RES_RESULT];
  }

  /**
   * 요청 에러 처리
   * @param err 에러 메시지
   */
  private errProce(err:any) {
    console.error('===========RESPONSE ERR============',JSON.stringify(err,null,2));
    let errMsg;
    err[COM_CONST.COMMON_RES_MSG] ? errMsg = err[COM_CONST.COMMON_RES_MSG] : errMsg = COM_CONST.FAIL_MSG;

    this.commonUtils.showAlert('', errMsg).present();
  }
}
