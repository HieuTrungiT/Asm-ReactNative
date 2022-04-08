
const express = require('express')
const app = express()
const port = 3030
// const idPost = ''; 
var cosr = require('cors');

app.use(cosr());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const multer = require('multer');
app.use(express.static('public'))
// delete File img
const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)
// uuid
function generateUUID() { // Public Domain/MIT
  var d = new Date().getTime();//Timestamp
  var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16;//random number between 0 and 16
    if (d > 0) {//Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {//Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}


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

// **************Update & Upload******************//

//-------------------Upload ảnh lên folder &  lưu lên SQL-------------------//
// var upload = multer({ storage: storage })
var setStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/uploads')
  },
  filename: (req, file, callback) => {
    const myArray = file.originalname.split('.');
    let imgName = new Date().getTime().toString() + '.' + myArray[myArray.length - 1];
    callback(null, `${imgName}`)
  }
})
var upload = multer({ storage: setStorage })

// lấy thông tin khi người dùng chọn ảnh
// 
app.post('/uploadImage', upload.single('profileImg', ''), (req, res, next) => {
  // code lưu ảnh lên SQL
  const files = req.file;
  if (!files) {
    const error = new Error('Please choose files')
    error.httpStatusCode = 400
    return next(error)
  }
  const idFolders = req.body.idImgFolders
  const nameImg = files.filename;

  var sql = "INSERT INTO `photofolder`( `idPostFolder`, `nameImg`, `ngayTao`) VALUES ( '" + idFolders + "', '" + nameImg + "', '" + new Date() + "')";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result)
  });
});


//  sửa hình ảnh trên Folder
var setStorageUpdate = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/uploads')
  },
  filename: (req, file, callback) => {
    const myArray = file.originalname.split('.');
    let imgName = new Date().getTime().toString() + '.' + myArray[myArray.length - 1];
    callback(null, `${imgName}`)
  }
})
var uploadUpdate = multer({ storage: setStorageUpdate })

// Sửa hình ảnh và bài đăng SQL 
app.post('/updateImageAndData', uploadUpdate.single('profileImg', ''), (req, res, next) => {
  // code lưu ảnh lên SQL
  console.log("--------------Update Post---------------");
  console.log('====================================');


  // 0: Sử lý data
  const files = req.file;
  var nameOld = req.body.nameImgOld;
  var filePath = './public/uploads/' + nameOld + '';
  const lengthOld = req.body.lengthOld;
  const lengthNew = req.body.lengthCout;
  const idFolderOld = req.body.idImgOld

  // DATA Old
  const idPost = req.body.idPost;
  const titleOld = req.body.titleOld;
  const contentOld = req.body.contentOld;
  const locationOld = req.body.locationOld;
  const keySearchOld = req.body.keySearchOld;

  // DATA new
  const titleUpdatePost = req.body.titleUpdatePost;
  const contentUpdatePost = req.body.contentUpdatePost;
  const locationUpdatePost = req.body.locationUpdatePost;
  const keySearchUpdatePost = req.body.keySearchUpdatePost;

  // KIỂM TRA GIÁ TRỊ GÁN VÔ TẠM
  var title = titleUpdatePost == '' ? titleOld : titleUpdatePost;
  var content = contentUpdatePost == '' ? contentOld : contentUpdatePost;
  var location = locationUpdatePost == '' ? locationOld : locationUpdatePost;
  var keySearch = keySearchUpdatePost == '' ? keySearchOld : keySearchUpdatePost;


  //1:  sử lý ảnh cũ 
  fs.unlink(filePath, deleteFileCallback);
  function deleteFileCallback(error) {
    if (error) {
      console.log('Error in dleting file');
      console.log(error.message);
    } else {
      console.log('Deleted Successfully...');
    }
  }

  //2: Thêm ảnh vào Sql
  if (!files) {
    const error = new Error('Please choose files')
    error.httpStatusCode = 400
    return next(error)
  }

  const nameImg = files.filename;
  var sql = "UPDATE `photofolder` SET nameImg='" + nameImg + "',ngayTao= '" + new Date() + "' WHERE idImgFolder= '" + idFolderOld + "'"
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (lengthOld == lengthNew) {
      // //Cập nhật Post sql
      var sql = "UPDATE post SET title='" + title + "',location='" + location + "',keySearch='" + keySearch + "',content='" + content + "' WHERE idPost = " + idPost + "";
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        if (result == "ok" || result.affectedRows == 1) {
          res.send("ok")
        }
      });
    }
  });
});

// sửa bài viết không có ảnh
app.post('/updateNoImg', (req, res) => {

  // DATA Old
  const idPost = req.body.idPost;
  const titleOld = req.body.titleOld;
  const contentOld = req.body.contentOld;
  const locationOld = req.body.locationOld;
  const keySearchOld = req.body.keySearchOld;

  // DATA new
  const titleUpdatePost = req.body.titleUpdatePost;
  const contentUpdatePost = req.body.contentUpdatePost;
  const locationUpdatePost = req.body.locationUpdatePost;
  const keySearchUpdatePost = req.body.keySearchUpdatePost;

  // KIỂM TRA GIÁ TRỊ GÁN VÔ TẠM
  var title = titleUpdatePost == '' ? titleOld : titleUpdatePost;
  var content = contentUpdatePost == '' ? contentOld : contentUpdatePost;
  var location = locationUpdatePost == '' ? locationOld : locationUpdatePost;
  var keySearch = keySearchUpdatePost == '' ? keySearchOld : keySearchUpdatePost;
  // //Cập nhật Post sql
  var sql = "UPDATE post SET title='" + title + "',location='" + location + "',keySearch='" + keySearch + "',content='" + content + "' WHERE idPost = " + idPost + "";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result == "ok" || result.affectedRows == 1) {
      res.send("ok")
    }
  });

})


// Xóa bài đăng
// post xóa sản phẩm 
app.post('/deletePost/', (req, res) => {
  console.log(req.body);
  var arrImg = req.body.listImgFolder;
  var idFolders = req.body.idPostFolder;
  var idXoaPost = req.body.idPost;
  //1:  sử lý ảnh cũ 
  if (arrImg.length != [] || arrImg.length != 0 || arrImg.length != null) {
    arrImg.map((item) => {
      var filePath = './public/uploads/' + item.nameImg + '';
      fs.unlink(filePath, deleteFileCallback);
      function deleteFileCallback(error) {
        if (error) {
          console.log('Error in dleting file');
          console.log(error.message);
        } else {
          console.log('Deleted Successfully...');
        }
      }
    })
  }

  // Xóa trong SQL Post
  var sql = "DELETE FROM post WHERE idPost =" + idXoaPost + "";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result == "ok" || result.affectedRows == 1) {
      // Xóa trong SQL hình ảnh
      if (arrImg.length != [] || arrImg.length != 0 || arrImg.length != null) {
        var sql = "DELETE FROM photofolder WHERE idPostFolder='" + idFolders + "'";
        con.query(sql, function (err, result, fields) {
          if (err) throw err;
          if (result == "ok" || result.affectedRows == 1) {
            res.send("ok")
          }
        });
      }
    } else {
      res.send("ok")
    }
  });
})

// **************BÀI ĐĂNG******************//

// lấy danh sách bài đăng từ tài khoản
app.get('/post/', (req, res) => {
  var cout = 0;
  var sql = "SELECT * FROM `post` ORDER BY idPost DESC ";
  con.query(sql, function (err, result_post, fields) {
    if (err) throw err;

    //id folderImg
    result_post.map((item, index) => {
      const idFolderImgs = item.idPostFolder;
      // getDataImg
      var sql = "SELECT `idImgFolder`, `idPostFolder`, `nameImg`, `ngayTao` FROM `photofolder` WHERE idPostFolder = '" + idFolderImgs + "'";
      con.query(sql, function (err, listImgFolder, fields) {
        //  gán giá trị listImg vô ojjbjec bài đăng
        cout = cout + 1;
        if (err) throw err;
        Object.assign(result_post[index], { listImgFolder });
        if (result_post.length == cout) {
          res.send(result_post)
        }
      });
    });
    // end for
  });
})



app.get("/trangaccount/:idss", (req, res) => {
  console.log(req.params.idss);
  var cout = 0;
  var limit = 4;
  var ofsset = (req.params.idss - 1) * limit;
  var sql =
    "SELECT * FROM post ORDER BY idPost DESC LIMIT " +
    ofsset +
    " , " +
    limit;
  con.query(sql, function (err, result_post, fields) {
    if (err) throw err;

    //id folderImg
    result_post.map((item, index) => {
      const idFolderImgs = item.idPostFolder;
      // getDataImg
      var sql = "SELECT `idImgFolder`, `idPostFolder`, `nameImg`, `ngayTao` FROM `photofolder` WHERE idPostFolder = '" + idFolderImgs + "'";
      con.query(sql, function (err, listImgFolder, fields) {
        //  gán giá trị listImg vô ojjbjec bài đăng
        cout = cout + 1;
        if (err) throw err;
        Object.assign(result_post[index], { listImgFolder });
        if (result_post.length == cout) {
          res.send(result_post)
        }
      });
    });
    // end for
  });
});

//  get Data post:id bài viết
app.get('/getPostUpdate/:id', (req, res) => {

  const idPost = req.params.id;
  var sql = "SELECT * FROM `post`  WHERE idPost='" + idPost + "'";

  // var cout = 0;
  con.query(sql, function (err, result_post, fields) {
    if (err) throw err;
    const cout = 0;

    //   //id folderImg
    const idFolderImgs = result_post[0].idPostFolder;
    //     getDataImg
    console.log(idFolderImgs);
    var sql = "SELECT `idImgFolder`, `idPostFolder`, `nameImg`, `ngayTao` FROM `photofolder` WHERE idPostFolder = '" + idFolderImgs + "'";
    con.query(sql, function (err, listImgFolder, fields) {

      if (err) throw err;
      Object.assign(result_post[0], { listImgFolder });
      res.send(result_post)

    });

    // end for
  });
})


// Thêm bài đăng
app.post('/addPostNew', (req, res) => {
  // khi thêm  bài viết thì uuid làm mới
  const uuid = generateUUID();
  // idPost = uuid;
  const title = req.body.titleNewPost;
  const content = req.body.contentNewPost;
  const location = req.body.locationNewPost;
  const keySearch = req.body.keySearchNewPost;

  var sql = "INSERT INTO `post`(`idUser`, `title`, `location`, `keySearch`, `content`, `dateTime`,`idPostFolder`) VALUES (" + 1 + ", '" + title + "', '" + location + "', '" + keySearch + "', '" + content + "','" + new Date() + "', '" + uuid + "')";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;

    if (result == "ok" || result.affectedRows == 1) {
      console.log("thêm bài đăng")
      res.send({ idImgFolder: uuid, result })
    }
  });
})


// ******************AccoutUsser*******************//

// check tài khoản
app.get('/user/', (req, res) => {
  var sql = "SELECT * FROM `useraccout` WHERE idUser = 1";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result)
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
