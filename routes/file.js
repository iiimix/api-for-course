var fs = require("fs")
var path = require("path")
var express = require('express');
var multipart = require('connect-multiparty');


var router = express.Router();

router.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

router.post('/upload', multipart(), function(req, res) {
  //get filename
  var filename = req.files.files.originalFilename;


  // //copy file to a public directory
  var targetPath = path.dirname(__filename) + '/files/' + filename;


  //copy file
  fs.createReadStream(req.files.files.path).pipe(fs.createWriteStream(targetPath));

  //return file url
  res.json({
    success: true,
    msg: {
      url: 'http://' + req.headers.host + '/' + filename
    }
  });
});

router.get('/down',function(req, res, next){
    var currDir = path.normalize(req.query.dir),
        fileName = req.query.name,
        currFile = path.join(currDir,fileName),
        fReadStream;

    fs.exists(ç,function(exist) {
        if(exist){
            res.set({
                "Content-type":"application/octet-stream",
                "Content-Disposition":"attachment;filename="+encodeURI(fileName)
            });
            fReadStream = fs.createReadStream(currFile);
            fReadStream.on("data",(chunk) => res.write(chunk,"binary"));
            fReadStream.on("end",function () {
                res.end();
            });
        }else{
            res.set("Content-type","text/html");
            res.send("file not exist!");
            res.end();
        }
    });
});




module.exports = router;