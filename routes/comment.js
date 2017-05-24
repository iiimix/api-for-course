var Comment = require('../models/model_comment');
var config = require('../config');
var express = require('express');
var router = express.Router();
router.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Authorization");
	res.header("Access-Control-Allow-Methods", "DELETE,POST,GET,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});
/*
获取评论内容
 */
router.get('/comment/:id',
	// config.auth,
	(req, res) => {
		Comment.find(function(err, data) {
			if (err) return console.error(err);
			// console.log(req.param('id'))
			if (req.param('id') == undefined) {
				res.send(data);
				return;
			}
			// console.log('-----')
			// console.log(req.param('id'),data)
			let comments = [];
			for (let i in data) {
				if (data[i].file_id == req.param('id')) {
					comments.push(data[i])
				}
			}
			res.send(comments);

		})
	})
router.delete('/comment/:id',
		config.auth,
		(req, res) => {
			Comment.findOneAndRemove({
				_id: req.param('id')
			}, function(err, user) {
				if (err) {
					res.send(err);
				}
				res.json({
					success: true,
					messagez: '删除成功!'
				});
			});
		})
	/*
	回复评论内容
	 */
router.post('/recovery/:id',
		config.auth,
		(req, res) => {
			Comment.findOne({
				_id: req.param('id')
			}, (err, comment) => {
				comment.Recovery.push({
					username: req.body.username,
					text: req.body.text,
					datetime: Date.parse(new Date()).toString(),
				})
				comment.save(function(err) {
					if (err) {
						res.send(err);
					}
				});
				res.json({
					success: true,
					message: '回复成功!'
				});

			})
		})
	/*
	评论
	 */
router.post('/comment',
	config.auth,
	(req, res) => {
		console.log('-------')
			// console.log(req.body,req.query,req.params)
		var newComment = new Comment({
			file_id: req.body.file_id,
			username: req.body.username,
			text: req.body.text,
			datetime: Date.parse(new Date()).toString(),
			Recovery: []
		});
		newComment.save((err) => {
			if (err) {
				console.log(err)
				return res.json({
					success: false,
					message: '评论失败!'
				});
			}
			res.json({
				success: true,
				message: '评论成功!'
			});
		})
	})

module.exports = router;