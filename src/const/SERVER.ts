export const enum SERVER {
  SERVER_URL = 'http://localhost:80/'
  // SERVER_URL = 'http://35.187.221.208/'
  ,GET_MY_SUBSCRIBE = 'user/#/subscribe/#'//구독 리스트 조회
  ,ADD_SUBSCRIBE = 'user/subscribe'//구독
  ,DEL_SUBSCRIBE = 'user/subscribe/#/game/#'//구독 취소
  ,USER_ADD = 'user'//회원가입
  ,USER_UPDATE = 'user/#'//회원 정보 수정
  ,LOGIN = 'user/login' //로그인

  ,GET_GAME_LIST = 'game/list/#' //게임 리스트 조회
  ,SEARCH_GAME = 'game?q=#' //게임 검색

}
