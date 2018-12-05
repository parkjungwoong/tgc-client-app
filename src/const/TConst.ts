export module TConst {

  export enum CONST {
    IS_DEV = 'false'
    ,APP_TITLE = '게임 퀵마크'
    ,OK_CODE = '0000'
    ,FAIL_CODE = 'E0001'
    ,FAIL_MSG = '처리중 오류가 발생했습니다.'
    ,COMMON_RES_CODE = 'resCode'
    ,COMMON_RES_MSG = 'resMsg'
    ,COMMON_RES_RESULT = 'result'

    ,URL_PARAM_MARK = '#'

    ,ALERT_TITLE = '알림'
    ,LOADING_DEFAULT_MESSAGE = '요청중 입니다.'

    ,LIMIT = 10 //페이징 기본 값

    ,SEGMENT_TYPE_SUBSCRIBE = 0
    ,SEGMENT_TYPE_MESSAGE = 1

    ,FACEBOOK = 'faceBook'
    ,GOOGLE = 'google'
    ,TWITTER = 'twitter'

    ,FACEBOOK_PHOTO_LINK = 'https://graph.facebook.com/#/picture'

    ,GROUP_MAIL = 'bmdev2007@gmail.com'

    ,BANNER_MODAL = 'modal'
  }

  export enum SERVER {
    // SERVER_URL = 'http://192.168.0.109:80/'
    // SERVER_URL = 'http://35.187.221.208/'
    SERVER_URL = 'https://tgcapi.bmdevs.xyz/'

    ,CHECK_INIT = 'com/checkInit/#/#' //앱 실행 데이터 확인

    ,LOGIN = 'user/login' //로그인
    ,USER_ADD = 'user'//회원가입
    ,USER_UPDATE = 'user/#'//회원 정보 수정
    ,GET_MESSAGE_LIST = 'user/#/message' //메시지 리스트 조회
    ,USER_DEL = 'user'//회원 삭제
    ,THIRD_PARTY_LOGIN = 'user/thirdPartyLogin'//외부 연동 로그인

    ,SEARCH_GAME = 'game?q=#' //게임 검색
    ,GET_GAME_LIST = 'game/list'  //게임 리스트 조회
    ,GET_MY_SUBSCRIBE = 'game/subscribe/#'  //구독 중인 게임 조회
    ,GET_GAME_EVENT = 'game/event/game/#  '//게임 이벤트 조회
    ,GET_MY_EVENT = 'game/event/#'  //구독 중인 게임 이벤트 조회
    ,ADD_SUBSCRIBE = 'game/subscribe' //구독
    ,DEL_SUBSCRIBE = 'game/subscribe/#/game/#'  //구독 취소
    ,ADD_REMIND = 'game/remind' //사용자 알림 추가

    ,SERVICE_RULE_LINK = 'serviceRule.html'
  }
}


