import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

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
import {CalendarPage} from "../pages/calendar/calendar";
import {GamePage} from "../pages/game/game";
import {SetPage} from "../pages/set/set";
import {EventPage} from "../pages/event/event";
import {Facebook} from "@ionic-native/facebook";
import {AppVersion} from "@ionic-native/app-version";
import {Device} from "@ionic-native/device";
import {EmailComposer} from "@ionic-native/email-composer";
import {AdMob} from "ionic-admob";
import {BannerPage} from "../pages/banner/banner";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MyListPage,
    SetPage,
    LoginPage,
    regUserPage,
    CalendarPage,
    GamePage,
    EventPage,
    BannerPage
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
    SetPage,
    LoginPage,
    regUserPage,
    CalendarPage,
    GamePage,
    EventPage,
    BannerPage
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
    Firebase,
    Facebook,
    AppVersion,
    Device,
    EmailComposer,
    AdMob
  ]
})
export class AppModule {}
