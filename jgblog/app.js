const express = require("express");
const connect = require("./schemas");
const app = express();
const port = 3000;
const moment = require("moment");


connect(); 

const postingRouter = require("./routes/posting");

const requestMiddleware = (req,res,next) =>{
    console.log("request url", req.originalUrl, " - ", new Date());
    next();
};

app.use(express.static('static'))

app.use(express.json());
// // 기본 path를 /public으로 설정(css, javascript 등의 파일 사용을 위해)
// app.use(express.static(__dirname + '/public'));
app.use(requestMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use("/api",postingRouter);

app.get("/",(req,res) => {
    // res.sendFile( __dirname +"./static/main")
    res.send("Hellow world@@@@@");
});
app.listen(port,() => {
    console.log(port, "포트로 서버가 켜졌어요");
});