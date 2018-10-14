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
import {UserService} from "../services/userService";
import {ComService} from "../services/comService";
import {MyListPage} from "../pages/myList/myList";
import {LoginPage} from "../pages/logIn/login";
import {regUserPage} from "../pages/regUser/regUser";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MyListPage,
    ListPage,
    LoginPage,
    regUserPage
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
    MyListPage,
    ListPage,
    LoginPage,
    regUserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide:HTTP_INTERCEPTORS,useClass: apiCallInterceptor,multi:true},
    GamesService,
    UserService,
    ComService,
    UserData,
    ApiCall,
    CommonUtils,
    LocalDataUtils,
    Firebase
  ]
})
export class AppModule {}
