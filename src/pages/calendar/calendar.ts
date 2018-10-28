import { Component } from '@angular/core';
import {Events, ModalController, NavController, NavParams} from 'ionic-angular';
import {GamesService} from "../../services/gamesService";
import {UserData} from "../../datas/user-data";
import {eventVO} from "../../vo/eventVO";
import {CommonUtils} from "../../common/commonUtils";
import {GameVO} from "../../vo/gameVO";
import {LoginPage} from "../logIn/login";
import {UserInfo} from "../../vo/userInfo";

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})
export class CalendarPage {
  userInfo:UserInfo;

  subscribeList:Array<GameVO>;//구독 항목
  eventList:Array<eventVO>;//이벤트 목록
  rowDate:Array<any> = [];//당월 한주 씩 일자
  calendarData:Array<any> = [];//최종 달력에 표시될 데이터
  colors:Array<string>;

  date: any;
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  monthNames: string[];
  currentMonth: any;
  currentYear: any;
  currentDate: any;

  constructor(public navCtrl: NavController
              ,public navParams: NavParams
              ,private gameService: GamesService
              ,private commonUtil:CommonUtils
              ,private modalCtrl: ModalController
              ,private events: Events
              ,private userData:UserData) {
    //로그인 필요한 페이지
    this.userData.hasLoggedIn().then( isLogin=>{
      //로그인 되었으면 이벤트 조회 / 아니면 로그인 모달
      isLogin ? this.initCalendar() : this.modalCtrl.create(LoginPage).present();
    });

    this.events.subscribe('user:login', value => {
      this.initCalendar();
    });

    this.events.subscribe('user:logout', value => {
      //todo: 초기화
    });
  }

  initCalendar(){
    this.date = new Date();
    this.monthNames = ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"];
    this.colors = ['event-color','event-color2','event-color3','event-color4','event-color5','event-color6','event-color7','event-color8','event-color9','event-color10'];

    //당월 날짜 값 세팅
    this.getDaysOfMonth();

    //구독중인 이벤트 조회
    this.getEventList();
  }

  //이벤트 조회
  getEventList(){
    this.getInitData().then(flag => {
      if(flag){
        this.setColor();
        //날짜 세팅
        this.setListDay();
        //이벤트 데이터 세팅
        this.setListEvent();
      }
    });
  }

  //필수 데이터 조회
  async getInitData(){
    this.userInfo = await this.userData.getUserInfo();
    this.subscribeList = await this.gameService.getMyList(this.userInfo.custNo,1);//구독중인 게임
    this.eventList = await this.gameService.getMyEvent(this.userInfo.custNo,1);//게임 이벤트 리스트 조회

    return true;
  }

  //달력에서 특정 게임 이벤트만 보기
  toggleEventHide(gameId:string){
    this.eventList.forEach(event => {
      if(gameId == 'all') event.isHide = false;
      if(gameId != 'all' && event.gameId == gameId) event.isHide = !event.isHide;
    });

    this.setListEvent();
  }

  //이벤트 상세 보기
  eventDetail(eventInfo){
    if(this.commonUtil.isEmpty(eventInfo.eventId)) return;
    let selectedEvent = this.eventList.find((event) => {
      return event.eventId == eventInfo.eventId;
    });
    let selectedGame = this.subscribeList.find((game) => { return game.id == selectedEvent.gameId});

    //todo : 상세 보기 화면 개발하기, 이벤트 링크, 설명, 등
    this.commonUtil.showAlert(selectedGame.name,selectedEvent.title).present();
  }

  //색 세팅
  setColor(){
    const subscribeLen:number = this.subscribeList.length;
    const colorLen:number = this.colors.length;
    const eventLen:number = this.eventList.length;

    //구동 중인 게임 색 세팅
    for(let i=0;i<subscribeLen;i++){
      let color =  i > colorLen-1 ? this.colors[ this.commonUtil.getRandomNum(1)] : this.colors[i];

      this.subscribeList[i].color = color;

      //게임 이벤트 배경색 세팅
      for(let j=0;j<eventLen;j++){
        if(this.eventList[j].gameId == this.subscribeList[i].id){
          this.eventList[j].titleColor = color;
        }
      }
    }
    console.log('this.eventList',this.eventList);
  }

  //날짜 값 세팅
  setListDay(){
    const rowCnt:number = 7;

    let curDate = this.daysInLastMonth;
    curDate = curDate.concat(this.daysInThisMonth);

    for(let j=0; j<curDate.length; j+=rowCnt) {
      //0, 7, 14
      let dayRow = [];
      for(let i=j; i<rowCnt+j && i<curDate.length; i++){
        //0~6 / 7~13 / 14 ~ 20 / ....
        dayRow.push(curDate[i]);
      }
      this.rowDate.push( {day: dayRow} );
    }
  }

  setListEvent(){
    if(this.rowDate === undefined && this.rowDate.length == 0) return;

    let mergeList = []; //이벤트와 날짜 머지한 리스트

    for(let i=0; i<this.rowDate.length; i++){
      let rowDay = this.rowDate[i].day;
      mergeList.push( {day : rowDay.map( i => { return (i+'').substring(6,8) })} );

      let events:Array<eventVO> = [];

      //날짜가 해당 로우의 날짜인 이벤트만 추출
      events = this.eventList.filter(event => !event.isHide && this.checkRageDate(event.stDt,event.enDt,rowDay[0],rowDay[rowDay.length-1]) );

      while(events.length != 0){
        let eventRow = this.setEventRow(events,rowDay);
        mergeList.push({event: eventRow});

        //eventRow에 들어간 이벤트 제외하고 다시 row 세팅
        events = events.filter( event => {
          let flag = true;
          for(let j=0; j<eventRow.length; j++){
            if(event.eventId == eventRow[j].eventId) {
              flag = false;
              break;
            }
          }
          return flag;
        });
      }
    }

    this.calendarData = mergeList;
  }

  /**
   * 이벤트 로우 생성
   * @param {Array<any>} events
   * @param {Array<any>} rowDay
   * @returns {Array<any>}
   */
  setEventRow(events:Array<eventVO>,rowDay:Array<any>):Array<any>{

    let pointer:number = 0; //안 칠해진 칸 중 가장 빠른 인덱스
    const rowMaxNum:number = rowDay.length; //한줄에 7칸

    let eventRow = [];

    for(let i=0; i<rowMaxNum; i=pointer){

      for(let j=0; j<events.length; j++){
        let curEvent = events[j];
        let stDt = curEvent.stDt;

        if(rowDay[0] > stDt) stDt = rowDay[0];//시작 날짜가 이번주 첫일 보다 빠르거나(저번주 이상부터 시작)

        //해당 날짜에 시작하는 이벤트가 있으면 해당 일자 만큼 칸 칠함
        if( rowDay[i] == stDt ){
          let colCnt = this.getDateDif(stDt+'',curEvent.enDt+''); //일자 수만큼
          if(colCnt > rowMaxNum-pointer) colCnt = rowMaxNum-pointer;//남은 일보다 크면 남은 칸만큼만 지정
          eventRow.push({title:curEvent.title, col:colCnt, color:curEvent.titleColor, eventId:curEvent.eventId, gameId:curEvent.gameId});
          pointer += colCnt;
          break;
        }
      }

      //해당 날짜에 이벤트가 없으면
      if(pointer == i) {
        eventRow.push({title:'', col:1, color:'', eventId:'',gameId:''});
        pointer++;
      }
    }

    return eventRow;
  }

  /**
   * 날짜 차이 구하기
   * @param {string} stDt start
   * @param {string} enDt end
   * @returns {number} 날짜 차이
   */
  getDateDif(stDt:string,enDt:string):number{
    //같은 달이면 단순하게 빼서 반환
    if(stDt.substring(0,6) == enDt.substring(0,6)){
      return Math.abs(Number(enDt) - Number(stDt) + 1 );
    }
    //다음 달이면 단순하게 맥스값 반환
    if(stDt.substring(4,6) == '10' && stDt.substring(4,6) < enDt.substring(4,6)){
      return 7;
    }
    //지난 달이면
    let year = Number(stDt.substring(0,4));
    let month = Number(stDt.substring(4,6));
    let date = Number(stDt.substring(6,8));

    let d1 = new Date(year,month,date).getTime();

    year = Number(enDt.substring(0,4));
    month = Number(enDt.substring(4,6));
    date = Number(enDt.substring(6,8));
    let d2 = new Date(year,month,date).getTime();

    let dif = d2-d1;
    const tmsms:number = 24 * 60 * 60 * 1000;// 시 * 분 * 초 * 밀리세컨
    return Math.abs(Math.floor(dif/tmsms));
  }

  checkRageDate(eventStDt:number, eventEnDt:number,rowStDt:number, rowEnDt:number):boolean{
    return eventEnDt >= rowStDt && eventStDt<= rowEnDt;
  }

  getDaysOfMonth() {
    this.daysInThisMonth = [];
    this.daysInLastMonth = [];
    this.daysInNextMonth = [];
    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();
    if(this.date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }

    var prevMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 0);//지난달

    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();//이번달 1일의 요일 (*요일)
    var prevNumOfDays = prevMonth.getDate();//저번달 마지막 날짜 (*일)
    /**
     * ex) 이번달 달력의 저번달 일자 구하기
     *
     * 이번달 첫 날짜 : 2018-09-01 토요일,
     * 전달 마지막 날짜 : 2018-08-31 금요일,
     *
     * 이번달 달력에서 저번달 일자 보여줄려면 저번달 마지막 날짜에서 저번달 마지막 일요일 날짜까지 구해야됨
     * *요일 인덱스는 0(일) ~ 6(토)
     * 저번달 마지막 날짜(31일) - (이번달 첫 요일 인덱스(6) - 1) => 26 => 26일은 저번달 일요일임
     * 그럼 26 부터 31 까지 1씩 증가시켜서 배열에 넣으면 이번달 달력의 저번달 일자 구해짐
     */
    var prevYearMonth = this.getYYYYMMDD('0',0);
    for(var i = prevNumOfDays-(firstDayThisMonth-1); i <= prevNumOfDays; i++) {
      this.daysInLastMonth.push(prevYearMonth+i);
    }

    var thisYearMonth = this.getYYYYMMDD('0',1);
    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDate();
    for (var j = 0; j < thisNumOfDays; j++) {
      this.daysInThisMonth.push(thisYearMonth+j+1);
    }

    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDay();
    // var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0).getDate();
    for (var k = 0; k < (6-lastDayThisMonth); k++) {
      this.daysInNextMonth.push(k+1);
    }
    var totalDays = this.daysInLastMonth.length+this.daysInThisMonth.length+this.daysInNextMonth.length;
    if(totalDays<36) {
      for(var l = (7-lastDayThisMonth); l < ((7-lastDayThisMonth)+7); l++) {
        this.daysInNextMonth.push(l);
      }
    }
  }

  /**
   * 날짜 넣으면 년도랑 월 같이해서 숫자로 반환
   * @param {number} date 일자
   * @param {number} dateInit Date 시점 ( 0: 전달, 1:이번달 )
   * @returns {number}
   */
  getYYYYMMDD(date:string,dateInit:number):number{

    let dateObj = new Date(this.date.getFullYear(), this.date.getMonth(), dateInit);

    let year = dateObj.getFullYear();
    let month = dateObj.getMonth()+1;
    let monthStr = month+'';

    if(month < 10) monthStr = '0'+month;
    if(date.length != 2) date = '0'+date;

    return Number(year+''+monthStr+''+date);
  }

  //todo 이전, 다음 달 넘기는 기능
}
