import {Injectable} from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserInfo } from '../vo/userInfo'

@Injectable()
export class UserData {

  //로컬 스토러지 키 값
  private HAS_LOGGED_IN = 'hasLoggedIn';
  private HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  private USER_INFO = 'userInfo';

  constructor(
    private events: Events,
    private storage: Storage
  ) {}

  //로그인 정보 저장
  insertLoginInfo(userInfo: UserInfo): boolean {
    console.debug('insertLoginInfo', JSON.stringify(userInfo,null,2));
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.storage.set(this.USER_INFO, userInfo);
    this.events.publish('user:login');
    return true;
  };

  //로그아웃
  logout(): void {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove(this.USER_INFO);
    this.events.publish('user:logout');
  };

  //로그인 체크
  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

  //로그인 정보 가져오기
  getUserInfo(): Promise<UserInfo> {
    return this.storage.get(this.USER_INFO).then((value) => {
      return value;
    }).catch(err => {
      return false;
    });
  };

  //튜토리얼 봤는지 체크
  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  };
}
