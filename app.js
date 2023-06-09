// app.js 파일 전체 과정
// 1. 입력파일 처리 및 MySQL DB저장
// 2. MySQL에서 추출한 데이터를 JSON 형식으로 전달

const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const app = express();
const router = express.Router(); // 라우터 객체 생성
app.set('port', process.env.PORT || 3000);
dotenv.config();

app.use('/', router);
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/'))); // 정적 파일 제공
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },

  name: 'session-cookie',
}));

const multer = require('multer');
const fs = require('fs');
const database = require('mime-db');

//inputfile 저장할 폴더 생성
try { 
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) { //파일 이름 지정
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 파일 최대 크기 설정
});

app.get('/upload', (req, res) => { //.../upload 로 이동 시 html 파일과 연결
  res.sendFile(path.join(__dirname, 'multipart.html'));
});

app.post('/upload', upload.single('text1'), (req, res) => { // 인풋 텍스트 파일 저장 위치 설정

  //db 스키마 이름: test , 기존 테이블 이름:user, 분할된 테이블 10개의 이름: newtable1 ~ newtable10
  const mysql = require('mysql');

  // MySQL 데이터베이스 연결 설정
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '20211026',
    database : 'nodejs'
  });
 
  // db 연결
  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
  });
  
  
  // 테이블 생성 쿼리
  const createTableQueries = [
    //파일의 전체 데이터 값이 저장 될 user테이블
    `CREATE TABLE user (
      cno VARCHAR(45) NOT NULL,
      task1 INT,
      task2 INT,
      task3 INT,
      task4 INT,
      task5 INT
    );`,
  
    `CREATE TABLE newtable1 (
      cno VARCHAR(45) NOT NULL,
      task1 INT,
      task2 INT,
      task3 INT,
      task4 INT,
      task5 INT
    );`,
  
    `CREATE TABLE newtable2 (
      cno VARCHAR(45) NOT NULL,
      task1 INT,
      task2 INT,
      task3 INT,
      task4 INT,
      task5 INT
    );`,
  
    `CREATE TABLE newtable3 (
      cno VARCHAR(45) NOT NULL,
      task1 INT,
      task2 INT,
      task3 INT,
      task4 INT,
      task5 INT
    );`,
  
    `CREATE TABLE newtable4 (
      cno VARCHAR(45) NOT NULL,
      task1 INT,
      task2 INT,
      task3 INT,
      task4 INT,
      task5 INT
    );`,
  
    `CREATE TABLE newtable5 (
      cno VARCHAR(45) NOT NULL,
      task1 INT,
      task2 INT,
      task3 INT,
      task4 INT,
      task5 INT
    );`,
  
    `CREATE TABLE newtable6 (
      cno VARCHAR(45) NOT NULL,
      task1 INT,
      task2 INT,
      task3 INT,
      task4 INT,
      task5 INT
    );`,
  
    `CREATE TABLE newtable7 (
      cno VARCHAR(45) NOT NULL,
      task1 INT,
      task2 INT,
      task3 INT,
      task4 INT,
      task5 INT
    );`,
  
    `CREATE TABLE newtable8 (
      cno VARCHAR(45) NOT NULL,
      task1 INT,
      task2 INT,
      task3 INT,
      task4 INT,
      task5 INT
    );`,
  
    `CREATE TABLE newtable9 (
      cno VARCHAR(45) NOT NULL,
      task1 INT,
      task2 INT,
      task3 INT,
      task4 INT,
      task5 INT
    );`,
  
    `CREATE TABLE newtable10 (
      cno VARCHAR(45) NOT NULL,
      task1 INT,
      task2 INT,
      task3 INT,
      task4 INT,
      task5 INT
    );`
  ];
  
  // 테이블 생성 함수
  function createTables() {
    for (let i = 0; i < createTableQueries.length; i++) {
      connection.query(createTableQueries[i], (err, results) => {
        if (err) {
          console.error(`테이블 ${i + 1} 생성 실패:`, err);
        } else {
          console.log(`테이블 ${i + 1}이(가) 성공적으로 생성되었습니다.`);
        }
      });
    }
  }
  
  // 테이블 생성 함수 실행
  createTables();

  //인풋 텍스트 파일 저장
  connection.query("LOAD DATA LOCAL INFILE 'C:/node/nodegraph/uploads/inputfile.txt' REPLACE INTO TABLE user FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\n'");

  // MySQL 쿼리 실행 함수 (10개의 테이블로 데이터 전달)
  function executeQueries() {
    const queries = [
      'INSERT INTO newtable1 SELECT * FROM user LIMIT 5',
      'INSERT INTO newtable2 SELECT * FROM user LIMIT 5 OFFSET 5',
      'INSERT INTO newtable3 SELECT * FROM user LIMIT 5 OFFSET 10',
      'INSERT INTO newtable4 SELECT * FROM user LIMIT 5 OFFSET 15',
      'INSERT INTO newtable5 SELECT * FROM user LIMIT 5 OFFSET 20',
      'INSERT INTO newtable6 SELECT * FROM user LIMIT 5 OFFSET 25',
      'INSERT INTO newtable7 SELECT * FROM user LIMIT 5 OFFSET 30',
      'INSERT INTO newtable8 SELECT * FROM user LIMIT 5 OFFSET 35',
      'INSERT INTO newtable9 SELECT * FROM user LIMIT 5 OFFSET 40',
      'INSERT INTO newtable10 SELECT * FROM user LIMIT 5 OFFSET 45'
    ];

    // Promise 로 비동기적 처리
    // 테이블 생성 및 삽입 과정이 완전히 끝난 후 main.html이 실행되도록
    // 쿼리 실행
    const promises = queries.map((query, index) => {
      return new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
          if (err) reject(err);
          console.log(`Query ${index + 1} executed successfully`);
          resolve();
        });
      });
    });

    //모든 쿼리 실행이 완료된 후 main.html 실행
    Promise.all(promises)
    .then(() => {
      console.log("실행 끝");
      res.sendFile(path.join(__dirname, 'main.html'));
    })
    .catch((err) => {
      console.error("쿼리 실행 중 에러 발생:", err);
    });
  }
  
  //MySQL 쿼리 실행
  executeQueries();

  //db연결 종료
  connection.end();
});

router.get("/data", (req, res)=>{
  const mysql = require('mysql');
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '20211026',
    database : 'nodejs'
  });

  //db 연결
  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
  });

  //모든 core별 task데이터를 저장할 객체, 모든 task별 core데이터를 저장할 객체
  var coreResults = [];
  var taskResults = [];

  //core별 task데이터 추출 쿼리
  const coreQueries = [
    `
      SELECT * FROM (
        SELECT * FROM newtable1 UNION ALL
        SELECT * FROM newtable2 UNION ALL
        SELECT * FROM newtable3 UNION ALL
        SELECT * FROM newtable4 UNION ALL
        SELECT * FROM newtable5 UNION ALL
        SELECT * FROM newtable6 UNION ALL
        SELECT * FROM newtable7 UNION ALL
        SELECT * FROM newtable8 UNION ALL
        SELECT * FROM newtable9 UNION ALL
        SELECT * FROM newtable10
      ) AS core_data WHERE cno = "core1"
    `,
    `
      SELECT * FROM (
        SELECT * FROM newtable1 UNION ALL
        SELECT * FROM newtable2 UNION ALL
        SELECT * FROM newtable3 UNION ALL
        SELECT * FROM newtable4 UNION ALL
        SELECT * FROM newtable5 UNION ALL
        SELECT * FROM newtable6 UNION ALL
        SELECT * FROM newtable7 UNION ALL
        SELECT * FROM newtable8 UNION ALL
        SELECT * FROM newtable9 UNION ALL
        SELECT * FROM newtable10
      ) AS core_data WHERE cno = "core2"
    `,
    `
      SELECT * FROM (
        SELECT * FROM newtable1 UNION ALL
        SELECT * FROM newtable2 UNION ALL
        SELECT * FROM newtable3 UNION ALL
        SELECT * FROM newtable4 UNION ALL
        SELECT * FROM newtable5 UNION ALL
        SELECT * FROM newtable6 UNION ALL
        SELECT * FROM newtable7 UNION ALL
        SELECT * FROM newtable8 UNION ALL
        SELECT * FROM newtable9 UNION ALL
        SELECT * FROM newtable10
      ) AS core_data WHERE cno = "core3"
    `,
    `
      SELECT * FROM (
        SELECT * FROM newtable1 UNION ALL
        SELECT * FROM newtable2 UNION ALL
        SELECT * FROM newtable3 UNION ALL
        SELECT * FROM newtable4 UNION ALL
        SELECT * FROM newtable5 UNION ALL
        SELECT * FROM newtable6 UNION ALL
        SELECT * FROM newtable7 UNION ALL
        SELECT * FROM newtable8 UNION ALL
        SELECT * FROM newtable9 UNION ALL
        SELECT * FROM newtable10
      ) AS core_data WHERE cno = "core4"
    `,
    `
      SELECT * FROM (
        SELECT * FROM newtable1 UNION ALL
        SELECT * FROM newtable2 UNION ALL
        SELECT * FROM newtable3 UNION ALL
        SELECT * FROM newtable4 UNION ALL
        SELECT * FROM newtable5 UNION ALL
        SELECT * FROM newtable6 UNION ALL
        SELECT * FROM newtable7 UNION ALL
        SELECT * FROM newtable8 UNION ALL
        SELECT * FROM newtable9 UNION ALL
        SELECT * FROM newtable10
      ) AS core_data WHERE cno = "core5"
    `,
  
  ];
  //task별 core데이터 추출 쿼리
  const taskQueries = [
    `
      SELECT task1 FROM (
        SELECT task1 FROM newtable1 UNION ALL
        SELECT task1 FROM newtable2 UNION ALL
        SELECT task1 FROM newtable3 UNION ALL
        SELECT task1 FROM newtable4 UNION ALL
        SELECT task1 FROM newtable5 UNION ALL
        SELECT task1 FROM newtable6 UNION ALL
        SELECT task1 FROM newtable7 UNION ALL
        SELECT task1 FROM newtable8 UNION ALL
        SELECT task1 FROM newtable9 UNION ALL
        SELECT task1 FROM newtable10
      ) AS task_data1
    `,
    `
      SELECT task2 FROM (
        SELECT task2 FROM newtable1 UNION ALL
        SELECT task2 FROM newtable2 UNION ALL
        SELECT task2 FROM newtable3 UNION ALL
        SELECT task2 FROM newtable4 UNION ALL
        SELECT task2 FROM newtable5 UNION ALL
        SELECT task2 FROM newtable6 UNION ALL
        SELECT task2 FROM newtable7 UNION ALL
        SELECT task2 FROM newtable8 UNION ALL
        SELECT task2 FROM newtable9 UNION ALL
        SELECT task2 FROM newtable10
      ) AS task_data2
    `,

    `
      SELECT task3 FROM (
        SELECT task3 FROM newtable1 UNION ALL
        SELECT task3 FROM newtable2 UNION ALL
        SELECT task3 FROM newtable3 UNION ALL
        SELECT task3 FROM newtable4 UNION ALL
        SELECT task3 FROM newtable5 UNION ALL
        SELECT task3 FROM newtable6 UNION ALL
        SELECT task3 FROM newtable7 UNION ALL
        SELECT task3 FROM newtable8 UNION ALL
        SELECT task3 FROM newtable9 UNION ALL
        SELECT task3 FROM newtable10
      ) AS task_data3
    `,

    `
      SELECT task4 FROM (
        SELECT task4 FROM newtable1 UNION ALL
        SELECT task4 FROM newtable2 UNION ALL
        SELECT task4 FROM newtable3 UNION ALL
        SELECT task4 FROM newtable4 UNION ALL
        SELECT task4 FROM newtable5 UNION ALL
        SELECT task4 FROM newtable6 UNION ALL
        SELECT task4 FROM newtable7 UNION ALL
        SELECT task4 FROM newtable8 UNION ALL
        SELECT task4 FROM newtable9 UNION ALL
        SELECT task4 FROM newtable10
      ) AS task_data4
    `,

    `
      SELECT task5 FROM (
        SELECT task5 FROM newtable1 UNION ALL
        SELECT task5 FROM newtable2 UNION ALL
        SELECT task5 FROM newtable3 UNION ALL
        SELECT task5 FROM newtable4 UNION ALL
        SELECT task5 FROM newtable5 UNION ALL
        SELECT task5 FROM newtable6 UNION ALL
        SELECT task5 FROM newtable7 UNION ALL
        SELECT task5 FROM newtable8 UNION ALL
        SELECT task5 FROM newtable9 UNION ALL
        SELECT task5 FROM newtable10
      ) AS task_data5
    `
  ];

  //쿼리 실행하여 coreResults와 taskResults에 데이터 저장
  for (let i = 0; i < coreQueries.length; i++) {
    
    //core쿼리 실행
    connection.query(coreQueries[i], function(error, results, fields) {
      if (error) throw error;

      var coreData = []; 
      for (let j = 0; j < results.length; j++) {
        var rowValues = Object.values(results[j]);
        for (let k = 1; k < rowValues.length; k++) {
          coreData.push(rowValues[k]);
        }
      }
      coreResults.push(coreData);

      //모든 core쿼리가 실행되었는지 확인
      if (coreResults.length === coreQueries.length) {
        
        //task쿼리 실행
        for (let x = 0; x < taskQueries.length; x++) {

          connection.query(taskQueries[x], function(error, results, fields) {
            if (error) throw error;

            const taskData = [];
            for (let y = 0; y < results.length; y++) {
              const rowValues = Object.values(results[y]);
              for (let z = 0; z < rowValues.length; z++) {
                taskData.push(rowValues[z]);
              }
            }
            taskResults.push(taskData);

            //coreResults와 taskResults를 담을 객체
            var resData = {};

            //모든 task쿼리가 실행되었으면 json형식으로 데이터 전달
            if (taskResults.length === taskQueries.length) {
              resData.core = coreResults;
              resData.task = taskResults;
              
              res.json({resData});
            }          

          });
        }
      }
    });
  }
});

app.listen(app.get('port'), () => {
  console.log('서버가 http://localhost:' + app.get('port') + '/upload' + ' 에서 실행 중입니다.');
});