var fs = require("fs")
var path = require("path")
var File = require('../models/model_file');
var express = require('express');
var multipart = require('connect-multiparty');
var config = require('../config');
var multiparty = require('multiparty');
var formidable = require('formidable');
var multer = require('multer');
var router = express.Router();
router.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Authorization");
  res.header("Access-Control-Allow-Methods", "DELETE,POST,GET,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});



router.post('/upload',
  multipart(),
  (req, res) => {
    var file = req.files.course_file;
    var name = req.body.name;
    var file_name = file.name;
    var type = file_name.slice(file_name.lastIndexOf('.') + 1, file_name.length)
      // //copy file to a public directory
    var targetPath = path.resolve(path.dirname(__filename), '../static/' + req.body.grade + '/' + file_name);

    //copy file
    fs.createReadStream(file.path).pipe(fs.createWriteStream(targetPath));

    var newFile = new File({
      name: name,
      grade: req.body.grade,
      author: req.body.author,
      datetime: Date.parse(new Date()),
      content: [],
      down_num: 0,
      description: req.body.description,
      image_url:req.body.image_url,
      file_name: file_name,
      size: file.size,
      type: type
    });
    newFile.save((err) => {
      if (err) {
        return res.json({
          success: false,
          message: '此课件已存在!'
        });
      }
      res.json({
        success: true,
        message: '添加成功!'
      });
    });

  });


// router.get('/down',
//   config.auth,
//   (req, res, next) => {
//     var currDir = path.normalize(req.query.dir),
//       fileName = req.query.name,
//       currFile = path.join(currDir, fileName),
//       fReadStream;

//     fs.exists(ç, function(exist) {
//       if (exist) {
//         res.set({
//           "Content-type": "application/octet-stream",
//           "Content-Disposition": "attachment;filename=" + encodeURI(fileName)
//         });
//         fReadStream = fs.createReadStream(currFile);
//         fReadStream.on("data", (chunk) => res.write(chunk, "binary"));
//         fReadStream.on("end", function() {
//           res.end();
//         });
//       } else {
//         // res.set("Content-type", "text/html");
//         res.json({
//             success: false,
//             message: '文件不存在!'
//           })
//           // res.send("file not exist!");
//           // res.end();
//       }
//     });
//   });

// router.post('/comment',
//   config.auth,
//   (req, res) => {
//     File.findOne({
//       _id: req.body.id
//     }, (err, file) => {
//       file.content.push({
//         username: req.body.username,
//         text: req.body.text,
//         datetime: Date.parse(new Date()).toString(),
//         Recovery: []
//       })
//       file.save(function(err) {
//         if (err) {
//           res.send(err);
//         }
//       });
//       res.json({
//         success: true,
//         message: '评论成功!'
//       });

//     })
//   })

router.post('/seeFile/:id',
  // config.auth,
  (req, res) => {
    // console.log('----' + req.param('id'))
    File.findOne({
      _id: req.param('id')
    }, (err, file) => {
      file.down_num++;
      file.save(function(err) {
        if (err) {
          res.send(err);
        }
      });
      res.json({
        success: true,
        message: '操作成功!'
      });

    })
  })
router.get('/file',
  // config.auth,
  (req, res) => {
    File.findOne({
      _id: req.query.id
    }, (err, file) => {
      res.json(file);

    })
  })

router.delete('/file',
  config.auth,
  (req, res) => {
    File.findOneAndRemove({
      _id: req.query.id
    }, function(err, file) {
      if (err) {
        res.send(err);
      }
      res.json({
        success: true,
        messagez: '删除成功!'
      });
    });
  });


module.exports = router;