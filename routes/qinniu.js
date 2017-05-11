// var qiniu = require('qiniu')
// const express = require('express');
// const router = express.Router();
// router.all('*', function(req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Headers", "X-Requested-With");
// 	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,OPTIONS");
// 	res.header("X-Powered-By", ' 3.2.1')
// 		// res.header("Content-Type", "application/json;charset=utf-8");
// 	next();
// });
// qiniu.conf.ACCESS_KEY = '99_AatpKZ5VE89g3TKKgWomBHc3MlJPWqjZ0f86z'
// qiniu.conf.SECRET_KEY = 'exikAD3y_QgQ2asC6BmerR7GuO2U10Ds5ZTXRGqv'
// var qs = require('querystring')
// 	// var http = require('http');
// 	// //要上传的空间
// var bucket = 'jcw0925';



// router.get('/down', function(req, res) {
// 	//构建私有空间的链接
// 	url = 'http://ooy2h61o7.bkt.clouddn.com/Web%E5%89%8D%E7%AB%AF%E6%80%A7%E8%83%BD.pdf';
// 	var policy = new qiniu.rs.GetPolicy();
// 	//生成下载链接url
// 	var downloadUrl = policy.makeRequest(url);
// 	//打印下载的url
// 	res.send(downloadUrl);
// });


// router.get('/list', function(req, res) {
// 	qiniu.rsf.listPrefix(bucket, '', '', 1000, '', function(err, ret) {
// 		if (err) {
// 			res.send(err);
// 			console.log(err);
// 		} else {
// 			res.send(ret);
// 			console.log(ret);
// 		}
// 	});
// })

// router.post('/upload_file', function(req, res) {
// 	//上传到七牛后保存的文件名
// 	key = 'test.js';

// 	//生成上传 Token
// 	token = uptoken(bucket, key);

// 	//要上传文件的本地路径
// 	filePath = './index.js'

// 	//调用uploadFile上传
// 	uploadFile(token, key, filePath).then((data) => {
// 		res.send({
// 			success: true,
// 			result: data
// 		})

// 	}, (rejected) => {
// 		res.send({
// 			success: true,
// 			result: false
// 		})
// 	})

// })

// //构建上传策略函数
// function uptoken(bucket, key) {
// 	var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
// 	return putPolicy.token();
// }
// console.log('./index.js');


// //构造上传函数
// function uploadFile(uptoken, key, localFile) {
// 	return new Promise((resolve, reject) => {
// 		var extra = new qiniu.io.PutExtra();
// 		qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
// 			if (!err) {
// 				console.log('----------------upload_sucess--------------')
// 					// 上传成功， 处理返回值
// 					// console.log(ret.hash, ret.key, ret.persistentId);
// 				resolve(ret);
// 			} else {
// 				console.log('----------------upload_error--------------')
// 					// 上传失败， 处理返回代码
// 					// console.log(err);
// 				reject(err);
// 			}
// 		});
// 	});
// }



// module.exports = router;