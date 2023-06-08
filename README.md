# [Nodejs/MySQL] 서버 생성하고 DB 연결해서 그래프 출력하기

### 사전 준비
- nodegraph/app.js에서 202번째 줄의 인풋 텍스트 파일 저장 경로를 본인 환경에 맞게 변경
- MySQL 사용자 정보 설정 변경 / database 안의 테이블 모두 삭제

### 실행 방법
1. 터미널에서 nodegraph 경로로 들어가 node app 실행
2. http://localhost:3000/upload 에 접속해 inputfile.txt 파일을 업로드 (uploads 폴더에 저장해두었음)
3. 이동한 화면에서 각 core1 ~ core5, task1 ~ task5 버튼을 누르며 그래프 결과 확인

<br/>

# 2023-05-29

## 1. DB 연결하기

### 1.1. MySQL 패키지 설치 및 실행

<img width="277" alt="Untitled2" src="https://github.com/dlwhsk0/Node/assets/94193594/23e0e4e2-7262-4875-98f2-7800b385f1dd">

### 1.2. DB 연결하고 데이터 출력

json 형식으로 출력된다.

<img width="382" alt="Untitled3" src="https://github.com/dlwhsk0/Node/assets/94193594/903ea569-4038-4bf7-95e8-6fd28b96b81f">
<img width="175" alt="Untitled4" src="https://github.com/dlwhsk0/Node/assets/94193594/475281a3-4b05-4b61-801b-f222ec8dc22b">

<br/>

# 2023-06-01 ~ 02

## 2. 넘겨줄 데이터가 담긴배열 만들기

<img width="183" alt="Untitled6" src="https://github.com/dlwhsk0/Node/assets/94193594/cce57734-e28e-41b2-836a-9fae6481bf65">

### 2.1. 3개의 테이블에서 core1의 task1의 평균을 구하기

<img width="181" alt="Untitled7" src="https://github.com/dlwhsk0/Node/assets/94193594/9dfbb341-178d-4cb4-82c7-e00c0039b233">

- 쿼리에서 UNION 이용해서 core1의 값들을 가져왔음
- rowValues[1] = core1의 task1의 값 이용해 평균 구함

### 2.2. (임시로 저장해둔 3개의 테이블) core1의 task 별 평균을 구하기

<img width="177" alt="Untitled8" src="https://github.com/dlwhsk0/Node/assets/94193594/f50b9577-d576-44a0-9a3c-8317c101be69">

## 3. Express 라이브러리 설치 후 서버 구동하기

로컬파일 시스템에서 직접 HTML 파일을 열어 실행하면 CORS 오류 발생
⇒ Express 라이브러리 사용

### 3.1. 라우터를 사용해 app.js 에서의 graph.js로 데이터 전송하기

데이터가 json 형식으로 잘 전송되고있는 화면이다:

<img width="401" alt="Untitled9" src="https://github.com/dlwhsk0/Node/assets/94193594/04ac76ba-bf3c-47bf-94e6-257ef86260d7">

<br/>

# 2023-06-03

## 4. 입력파일 처리 및 MySQl DB 데이터 관리

### 4.1 업로드된 파일을 읽어 가공한 후 DB 테이블 생성 및 데이터 삽입

- 가공한 파일 속 데이터를 MySQL 쿼리를 사용해 DB에 저장
  - 전체 데이터가 담길 user 테이블과 core1~core5/task1~task5 데이터 관리를 위한 newtable1~newtable10, 총 11개의 테이블 생성

<img width="334" alt="image" src="https://github.com/dlwhsk0/nodegraph/assets/94193594/1d61fc94-d1af-42ff-be19-9638bce6677d">
<img width="200" alt="image" src="https://github.com/dlwhsk0/nodegraph/assets/94193594/74fd9959-e470-47ed-89cd-b3292819f68c">

<br/>

# 2023-06-04

## 5. 그래프 출력 구현

chart.js를 사용했다.

<img width="882" alt="image" src="https://github.com/dlwhsk0/Node/assets/94193594/e256f4c5-e0b8-4193-855e-d4839c211c3d">

- 입력 파일 읽어서 데이터 mysql에 삽입

<br>

# 2023-06-06

- 그래프 출력 레이아웃 디자인

<img width="1280" alt="스크린샷 2023-06-06 190503" src="https://github.com/dlwhsk0/Node/assets/94193594/f8e7596e-fb57-4ba3-b0e0-161f3b30aeb6">

- 각 core/task 별 버튼 배치 및 onclick 이벤트 구현
- graph.js에서 받은 데이터 재가공
- MAX/MIN/AVG/STD 코드 재구현

<br>

# 2023-06-09

- 파일 업로드 페이지와 그래프 출력 페이지 디자인 및 완성
  - 파일 업로드 화면을 출력하는 페이지:
![_C__node_nodegraph_multipart html](https://github.com/dlwhsk0/nodegraph/assets/94193594/5eacfe5e-7faa-47a3-8b85-d039a4ae9d27)
 
  - 업로드한 파일에 대한 데이터의 최대/최소/평균/표준편차 그래프를 출력하는 페이지:
![localhost_3000_upload](https://github.com/dlwhsk0/nodegraph/assets/94193594/1619757e-9bbc-488e-805d-5d6ef845edc6)

