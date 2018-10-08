# 계획

1. 구독 가능 게임 리스트 조회
2. 구독 선택
3. 구독 리스트 조회
4. 푸시 구현 (파이어 베이스)
5. 캘린더 구현 또는 임베디드 켈린더 연동
6. 로그인 구현
7. 안드로이드 빌드

## Android 빌드
디버그 / 릴리즈 두가지가 있으며 각각 방법이 다름

* 디버그 apk 생성 방법\
  안드로이드 폰을 연결 후 개발자 모드와 USB 디버깅 옵션 허용 후 명령어 실행
  ```shell
  ionic cordova run android  --device
  ```
  `platforms/android/app/build/outputs/apk/debug/` 경로에 생성됨

* 릴리즈 apk 생성 방법

  1.릴리즈 키 생성 (최초 1회 필요)
  ```shell
  keytool -genkey -v -keystore 키명칭.keystore -alias 키별칭 -keyalg RSA -keysize 2048 -validity 10000
  ```
  키별칭(alias_name) 잘 기억해두기!(fireBase 연동시 필요) \
  이 프로젝트는 `tgc` 로 함\
  ___!주의! 키 잃어버리면 앱 업데이트 못함___

  2.디버깅 플러그인 삭제
  ```shell
  ionic cordova plugin rm cordova-plugin-console
  ```

  3.build unsigned APK\
  config.xml 파일 기준으로 빌드함, 이 파일은 기본값으로 세팅되어 있어 환경에 맞게 바꿔줘야함.
  [config.xml doc] [config link] 참고
  widget 태그의 `id`,`version`, 하위 태그 중 `name`, `description`, 등 설정 후 명령어 실행 
  ```shell
  ionic cordova build --release android
  ```
  `platforms/android/app/build/outputs/apk/release/`에 apk파일 생성 확인
  
  4.sign APK\
  JDK에 내장된 jarsigner를 이용함
  ```shell
  jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore 키명칭.keystore unsigned.apk 별칭
  ```
  
  5.apk 최적화\
  안드로이드 sdk에 포함된 `zipalign`을 사용함
  MaxOS에는 `~/Library/Android/sdk/build-tools/VERSION/zipalign` 경로 에 있음
  ```shell
  zipalign -v 4 HelloWorld-release-unsigned.apk HelloWorld.apk
  ```
  [배포관련 ionic 공식 문서] [배포 문서] 참고함
  
  생성된 apk파일을 구글 콘솔에 업로드

[config link]: https://cordova.apache.org/docs/en/8.x/config_ref/index.html
[배포 문서]: https://ionicframework.com/docs/v1/guide/publishing.html

## FireBase 설정
1.fireBase console로 이동 후 프로젝트 생성
app id, name, sha1 해시값 입력
- app id => config.xml의 id 값 (com.bmdevs.tgc)
- name => 마켓에 등록한 앱 이름
- sha1 해시값 => 릴리즈 키에서 sha1 해시값 생성 후 사용 
```shell
keytool -exportcert -list -v -alias tgc(키 별칭) -keystore tgc-release-key.keystore(키파일)
```
2.google-services.json 파일 다운로드 후\
ioinc 프로젝트 root 디렉토리에 복사 (config.xml 과 같은 위치)

3.ionic app에 firebase plugin install
```shell
ionic cordova plugin add cordova-plugin-firebase
npm install --save @ionic-native/firebase
```

4.import firebase\
app.module.ts -> providers 에 등록
```javascript
providers: [
    StatusBar,
    .....,
    Firebase // 추가
  ]
```

5.firebase 코드 작성\
app.component.ts에 fireBase 예제 코드 등록(initializeApp() 함수 안에 등록함)\
[ioinc firebase 문서] [ionic firebase doc] 참고해서 작성

6.android로 앱 실행후 연동 확인(fireBase console에서 확인 가능)

[ionic firebase doc]: https://ionicframework.com/docs/native/#Add_Plugins_to_Your_App_Module
