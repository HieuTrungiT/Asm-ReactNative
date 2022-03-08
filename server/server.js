const express = require('express')
const app = express()
const port = 3000
var cosr = require('cors');
app.use(cosr());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//mysql
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "asm_react1"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// **************BÀI ĐĂNG******************//

// lấy danh sách bài đăng từ tài khoản
app.get('/post/', (req, res) => {
  var sql = "SELECT * FROM `post` ORDER BY idPost DESC ";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    // console.log(result);
    res.send(result)
  });
})

app.get('/trang/:ids', (req, res) => {
 
  var limit = 5;
  var ofsset = (req.params.ids - 1) * limit;
  var sql = "SELECT * FROM post ORDER BY idPost DESC LIMIT " + ofsset + " , " + limit;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result)
  });

})
// Thêm bài đăng
app.post('/addPostNew', (req, res) => {
  // var tenSp = req.body.tenSp
  // var giaSp = req.body.giaSp
  const idUser = req.body.idUserNewPost;
  const title = req.body.titleNewPost;
  const content = req.body.contentNewPost;
  const location = req.body.locationNewPost;
  const keySearch = req.body.keySearchNewPost;
  const uriImg = req.body.uriImgNewPost;

  var sql = "INSERT INTO `post`(`idUser`, `title`, `location`, `keySearch`, `content`, `imgPost`, `dateTime`) VALUES (" + 1 + ", '" + title + "', '" + location + "', '" + keySearch + "', '" + content + "', '" + uriImg + "', '" + new Date() + "')";

  con.query(sql, function (err, result, fields) {

    if (err) throw err;
    if (result == "ok") {
      res.send("ok")
    }
  });
})
// Sửa bài đăng
app.post('/updatePost', (req, res) => {
  const idPost = req.body.idPostUpdatePost;
  const title = req.body.titleUpdatePost;
  const content = req.body.contentUpdatePost;
  const location = req.body.locationUpdatePost;
  const keySearch = req.body.keySearchUpdatePost;
  const uriImg = req.body.uriImgUpdatePost;

  // //update sql
  var sql = "UPDATE post SET title='"+title+"',location='"+location+"',keySearch='"+keySearch+"',content='"+content+"',imgPost='"+uriImg+"' WHERE idPost = "+idPost+"" ;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result == "ok") {
      res.send("ok")
    }
  });
})
// Xóa bài đăng
// post xóa sản phẩm 
app.post('/deletePost/', (req, res) => {
  var idXoaPost = req.body.idXoa;
  // //update sql
  // console.log(req.body.idXoa);
  var sql = "DELETE FROM post WHERE idPost =" + idXoaPost + "";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result == "ok") {
      res.send("ok")
    }
  });
})
// ******************AccoutUsser*******************//

// check tài khoản
app.get('/user/', (req, res) => {
  var sql = "SELECT * FROM `useraccout` WHERE idUser = 1";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result)
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
