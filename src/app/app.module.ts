import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {apiCallInterceptor} from "../common/apiCallInterceptor";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LocalDataUtils} from "../common/localDataUtils";
import {CommonUtils} from "../common/commonUtils";
import {ApiCall} from "../common/apiCall";
import {UserData} from "../datas/user-data";
import {GamesService} from "../services/gamesService";
import {IonicStorageModule} from "@ionic/storage";
import {Firebase} from "@ionic-native/firebase";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide:HTTP_INTERCEPTORS,useClass: apiCallInterceptor,multi:true},
    UserData,
    ApiCall,
    GamesService,
    CommonUtils,
    LocalDataUtils,
    Firebase
  ]
})
export class AppModule {}
