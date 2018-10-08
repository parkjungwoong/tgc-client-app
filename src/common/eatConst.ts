
/**
 * 상수값
 */

export const enum EatConst {
  //URLS
  SERVER_URL = 'http://35.194.165.6/hellolunch/'
  ,EAT1000 = 'user/eat1000' //로그인
  ,EAT1010 = 'user/eat1010' //비밀번호 찾기
  ,EAT1020 = 'user/eat1010' //아이디 찾기
  ,EAT2000 = 'user/eat2000' //회원가입
  ,EAT2010 = 'user/eat2000' //회원정보 수정

  ,EAT3000 = 'common/eat3000'
  ,EAT3010 = 'common/eat3010'
  ,EAT3020 = 'common/eat3020' //광고정보 요청

  ,EAT5000 = 'store/eat5000'  //상점 상세
  ,EAT5010 = 'store/eat5010'  //마이픽 리스트
  ,EAT5020 = 'store/eat5020'  //올림픽 리스트
  ,EAT5030 = 'store/eat5030'  //베스트 올림픽 리스트
  ,EAT5040 = 'store/eat5040'  //리뷰 리스트
  ,EAT5050 = 'store/eat5050'  //리뷰 작성
  ,EAT5060 = 'store/eat5060'  //리뷰 수정
  ,EAT5070 = 'store/eat5070'  //리뷰 삭제
  ,EAT5080 = 'store/eat5080'  //좋아요 공통
  ,EAT5090 = 'store/eat5090'  //공유하기 공통
  ,EAT5100 = 'store/eat5100'  //리뷰 조회


  //픽 타입 ( L : 좋아요, P : 담기 )
  ,PICK_TYPE_LIKE = 'L'
  ,PICK_TYPE_MYPICK = 'P'

  //ETC
  ,ALERT_TITLE = '알림'
  ,COMMON_APP_VER = 'appVer'
  ,COMMON_APP_OS = 'appOS'
  ,COMMON_DEVICE_TOKEN = 'device_token'
  ,COMMON_MEMBER_NO = 'member_no'
  ,COMMON_LOGIN_TOKEN = 'login_token'

  //Server Response Json Key
  ,COMMON_RES_CODE = 'resCode'
  ,COMMON_RES_MSG = 'resMsg'
  ,COMMON_RES_RESULT = 'result'

  ,LOADING_DEFAULT_MESSAGE = '요청중 입니다.'

  //Server Response Codes
  ,SUCCESS_CODE = 'S0001'
  ,FAILL_CODE = 'E0001'
}

export const enum COMMON_CODE {
  SUCCESS_CODE = 'S0001'
  ,FAILL_CODE = 'E0001'
}

//픽 타입 ( L : 좋아요, P : 담기 )
export const enum PICK_TYPE {
  LIKE = 'L'
  ,MYPICK = 'P'
}

export const enum TARGET_TYPE {
  TARGET_TYPE_STORE = 'S'
  ,TARGET_TYPE_OLYMPIC = 'O'
  ,TARGET_TYPE_REVIEW = 'R'
}

export const enum SNS_TYPE {
  FACEBOOK = 'F'
  ,INSTAGRAM = 'I'
  ,TWITTER = 'T'
  ,NAVER = 'N'
  ,ETC = ''
}

export const enum EatHttpMethod {
  GET = 'GET'
  ,POST = 'POST'
  ,PUT = 'put'
  ,DELETE = 'delete'
}

//광고 타입
export const enum AD_TYPE {
  POP = 'POP'
  ,BANNER = 'BANNER'
  ,ETC = 'ETC'
}

//로컬 데이터 키
export const enum LOCAL_DATA_KEYS {
  AD_VER = 'AD_VER'
  ,AD_INFO = 'AD_INFO'
  ,USER_INFO = 'USER_INFO'
}

//페이징 수
export const enum PAGEING_SIZE {
  STORE = 5,
  OLYMPIC = 5,
  REVIEW = 5
}

//공유 타입
export const enum SHARE_TYPE {
  KAKAO = 'K'
  ,FACEBOOK = 'F'
  ,LINK = 'L'
}
