const mongoose = require("mongoose");
const connect = () => {
    mongoose.connect("mongodb://localhost:27017/blogdb").catch((err) => {
        console.error(err); // catch 에러처리 함수
    });
};
module.exports = connect;