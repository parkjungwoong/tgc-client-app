export const enum SERVER {
  SERVER_URL = 'http://localhost:80/'
  // SERVER_URL = 'http://35.187.221.208/'

  ,USER_ADD = 'user'//회원가입
  ,USER_UPDATE = 'user/#'//회원 정보 수정
  ,LOGIN = 'user/login' //로그인
  ,GET_MESSAGE_LIST = 'user/#/message' //메시지 리스트 조회

  ,SEARCH_GAME = 'game?q=#' //게임 검색
  ,GET_GAME_LIST = 'game/list' //게임 리스트 조회
  ,GET_MY_SUBSCRIBE = 'game/subscribe/#'//구독 중인 게임 조회
  ,GET_GAME_EVENT = 'game/event/game/#'//게임 이벤트 조회
  ,GET_MY_EVENT = 'game/event/#'//구독 중인 게임 이벤트 조회
  ,ADD_SUBSCRIBE = 'game/subscribe'//구독
  ,DEL_SUBSCRIBE = 'game/subscribe/#/game/#'//구독 취소

}
