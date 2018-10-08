import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * 로컬 저장소 공통 유틸
 */
@Injectable()
export class LocalDataUtils {

  constructor(private events: Events,private storage: Storage) {

  }

  get(key:string): Promise<any> {
    return this.storage.get(key);
  }

  set(key:string,value:any): Promise<any>  {
    return this.storage.set(key,value);
  }

  remove(key:string): Promise<any> {
    return this.storage.remove(key);
  }

}
