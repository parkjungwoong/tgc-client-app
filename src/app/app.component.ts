import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {ComService} from "../services/comService";
import {MyListPage} from "../pages/myList/myList";
import {CalendarPage} from "../pages/calendar/calendar";
import {UserService} from "../services/userService";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //todo: 로그인 유무에 따라 RootPage 변경, 로그인하면 CalendarPage
  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform
              , public statusBar: StatusBar
              , public splashScreen: SplashScreen
              , private comService: ComService
              , private userService: UserService
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: '캘린더', component: CalendarPage },
      { title: '검색', component: HomePage },
      { title: '내정보', component: MyListPage }
    ];

  }

  async initializeApp() {
    await this.platform.ready();
    this.statusBar.styleBlackOpaque();
    this.splashScreen.hide();
    await this.comService.checkAppInit().catch(e=>{
      console.error('checkAppInit',e);
    });
    await this.userService.checkLoginStatus().catch(e=>{
      console.error('checkLoginStatus',e);
    });
    this.comService.subscibeNotiMsg();

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
