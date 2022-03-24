const express = require("express");
const res = require("express/lib/response");
// const res = require("express/lib/response");
const Postings = require("../schemas/posting");
// ../ >> 내위치에서 더 상위 폴더
const router = express.Router();

router.get("/", (req,res) => {
    res.send("this is root page");
});



// router.get("/goods/:goodsId", async (req,res) => {
//     const {goodsId} = req.params; //url "/goods/:goodsId" 에서 goodsId를 받아오는것
//     // params(파라미터)로 넘어오는 값은 항상 stirng
//     const goods = await Goods.find({goodsId : Number(goodsId)});
//     //** const [detail] = await Goods.find({goodsId : Number(goodsId)});

//     // const [detail] = goods.filter((item) => item.goodsId === Number(goodsId));
//     // ^^ 직접받아오던 api를 필터링하던 코드
//     // const details = [];
//     // const [detail] = details;
//     res.json({
//         detail:goods,      //** detail,   << 객체초기화 약식
//     // filter() 메서드는 주어진 함수의 테스트를 통과하는 
//     // 모든 요소를 모아 새로운 배열로 반환합니다.
//     // console.log(goodsId);
//     // res.send("goodsId check");
//     })
// })



// detail page render
router.get("/bloglist/:postingDate", async (req,res) =>{
    
    const path = require("path")
    res.sendFile(path.join(__dirname + "/../static/detail.html"))
})

// correct page render
router.get("/bloglist/correct/:postingDate", async (req,res) =>{
    const path = require("path");
    res.sendFile(path.join(__dirname + "/../static/correct.html"));
})



// bloglist page list load
router.get("/bloglist", async (req, res, next) => {
    try {
    //   const { borderDate } = req.query;
      const bloglist = await Postings.find({ }).sort("-postingDate");
      res.json({ bloglist: bloglist });
    } catch (err) {
      console.error(err);
      next(err);
    }   
  });

// detail page data load
router.get("/bloglist/detail/:postingDate", async (req, res) => {
    console.log(req.params);
    const { postingDate } = req.params;
    const blog = await Postings.findOne({ postingDate: postingDate });
    //detail 값으로 넘겨줌
    res.json({ detail: blog });
});

// posting save
router.post("/posting", async (req,res)=>{
    
    const { title, userName, password,content,postingDate } = req.body;
    const postings = await Postings.find({ title});
    if(postings.length){
        return res.status(400).json({ sucess:false, errorMeassage :"이미있는데이터입니다."});
    }
    const createPosting = await Postings.create({title, userName, password, content, postingDate});
    res.json({positngs : createPosting}); 
    
})
// posting삭제
router.delete("/bloglist/detail/:postingDate", async (req, res) => {
  const { postingDate } = req.params;
  const isBorder = await Postings.find({ postingDate });
  if (isBorder.length > 0) {
    await Postings.deleteOne({ postingDate });
  }
  res.send({ result: "success" });
});
// posting 수정
router.patch("/bloglist/detail/:postingDate", async (req, res) => {
  const { postingDate } = req.params;
  const {title, userName, content } = req.body;
  isBorder = await Postings.find({ postingDate });
  if (isBorder.length) {
    await Postings.updateOne({ postingDate }, { $set: { title, userName, content } });
  }
  res.send({ result: "success" });
})
module.exports = router;