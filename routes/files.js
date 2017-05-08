var qiniu = require('qiniu')
qiniu.conf.ACCESS_KEY = '99_AatpKZ5VE89g3TKKgWomBHc3MlJPWqjZ0f86z'
qiniu.conf.SECRET_KEY = 'exikAD3y_QgQ2asC6BmerR7GuO2U10Ds5ZTXRGqv'
const express = require('express');
const router = express.Router();
router.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});
var qs = require('querystring')

//要上传的空间
bucket = 'jcw0925';
key = 'test.docx';

// router.get('/qiniu/upToken', function(req, res, next) {

//     var myUptoken = new qiniu.rs.PutPolicy(bucket);
//     var token = myUptoken.token();
//     moment.locale('en');
//     var currentKey = moment(new Date()).format('YYYY-MM-DD--HH-mm-ss');
//     res.header("Cache-Control", "max-age=0, private, must-revalidate");
//     res.header("Pragma", "no-cache");
//     res.header("Expires", 0);
//     if (token) {
//         res.json({
//             uptoken: token,
//             sava_key :currentKey
//         });
//     }

// });
// 
// 
router.get('/down', function(req, res) {
	//构建私有空间的链接
	url = 'http://ooy2h61o7.bkt.clouddn.com/no%20speed.jpeg';
	var policy = new qiniu.rs.GetPolicy();
	//生成下载链接url
	var downloadUrl = policy.makeRequest(url);
	//打印下载的url
	res.send(downloadUrl);
});



//构建bucketmanager对象
var client = new qiniu.rs.Client();
//你要测试的空间， 并且这个key在你空间中存在

//获取文件信息
client.stat(bucket, key, function(err, ret) {
	if (!err) {
		console.log(ret.hash, ret.fsize, ret.putTime, ret.mimeType);
	} else {
		console.log(err);
	}
});
module.exports = router;