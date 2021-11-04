// 필요한 모듈 가져오기
const express = require("express");
const db = require("./db");

// Express 서버 생성
const app = express();

// json 형태로 오는 요청의 본문을 해석해 줄 수 있도록 미들웨어 등록
app.use(express.json());

// 데이터베이스에 lists 테이블 생성하기
db.pool.query(
  `CREATE TABLE lists (
  id INTEGER AUTO_INCREMENT,
  value TEXT,
  PRIMARY KEY (id)
)`,
  (err, rows, fields) => {
    console.log("rows", rows);
  }
);

// 데이터베이스 lists 테이블에 있는 모든 데이터를 클라이언트 서버에 보내주기
app.get("/api/values", function (req, res) {
  db.pool.query("SELECT * FROM lists", (err, rows, fields) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.json(rows);
    }
  });
});

// 클라이언트에서 입력한 값을 데이터베이스 lists 테이블에 넣어주기
app.post("/api/values", function (req, res) {
  db.pool.query(
    `INSERT INTO lists (value) VALUES ("${req.body.value}")`,
    (err, rows, fields) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        return res.json({ success: true, value: req.body.value });
      }
    }
  );
});

// Express 서버가 포트 5000에서 시작
app.listen(5000, () => {
  console.log("애플리케이션이 서버가 5000번 포트에서 시작되었습니다!");
});
