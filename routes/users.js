var express = require('express');
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config');
var passport = require('passport');
var router = express.Router();
router.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Authorization");
  res.header("Access-Control-Allow-Methods", "DELETE,POST,GET,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

require('../passport')(passport);
/*
passport-http-bearer token 中间件验证
通过 header 发送 Authorization -> Bearer  + token
或者通过 ?access_token = token
 */
// router.get('/test_token',
//   passport.authenticate('bearer', {
//     session: false
//   }),
//   (req, res) => {
//     // res.send(req.user)
//     res.json({
//     sucess:true
//     });
//   });

/*
注册账户
 */
router.post('/signup', (req, res) => {
  if (!req.body.name || !req.body.password) {
    res.json({
      success: false,
      message: '请输入您的账号密码!'
    });
  } else {
    var newUser = new User({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      is_admin: false,
      is_teacher: false,
      is_login: false
    });
    // 保存用户账号
    newUser.save((err) => {
      if (err) {
        return res.json({
          success: false,
          message: '此用户已存在!'
        });
      }
      res.json({
        success: true,
        message: '成功创建新用户!'
      });
    });
  }
});


/*
检查用户名与密码并生成一个accesstoken如果验证通过
 */
router.post('/accesstoken', (req, res) => {
  User.findOne({
    name: req.body.name
  }, (err, user) => {
    if (err) {
      throw err;
    }
    if (!user) {
      res.json({
        success: false,
        message: '用户不存在!'
      });
    } else if (user) {


      /*
      检查密码是否正确
       */
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          if (user.is_login) {
            res.send({
              success: false,
              message: '您的账号已在其他地方登录!'
            });
          } else {
            var token = jwt.sign({
              name: user.name
            }, config.secret, {
              expiresIn: 10080
            });
            user.token = token;
            user.is_login = true;
            user.save(function(err) {
              if (err) {
                res.send(err);
              }
              ``
            });
            console.log('------' + user.name + ' is login--------');
            res.json({
              success: true,
              message: '登录成功!',
              token: 'bearer ' + token,
              id: user._id,
              name: user.name,
              is_admin: user.is_admin,
              is_teacher: user.is_teacher,
              email: user.email
            });
          }

        } else {
          res.json({
            success: false,
            message: '密码错误!'
          });
        }
      });
    }
  });
});



/*
退出账号，不支持异地登录
 */
router.post('/exit',
  config.auth,
  (req, res) => {
    let authorization = req.header('authorization');
    User.findOne({
      token: authorization.slice(7, authorization.length)
    }, (err, user) => {
      user.is_login = false;
      user.save(function(err) {
        if (err) {
          res.send(err);
        }
      });
      console.log('------' + user.name + ' is exit--------');
      res.json({
        success: true,
        message: '退出成功'
      });
    })
  });
/*
删除用户
 */
router.delete('/user',
  config.auth,
  (req, res) => {
    let authorization = req.header('authorization');
    User.findOne({
      token: authorization.slice(7, authorization.length)
    }, (err, action_user) => {
      if (action_user.is_admin) {
        console.log(req.body.name)
        User.findOneAndRemove({
          name: req.body.name
        },function(err, user) {
          if (err) {
            res.send(err);
          }
          res.json({
            success: true,
            messagez: '删除成功!'
          });
        });

      } else {
        res.json({
          success: false,
          message: '您不是管理员!'
        });
      }
    })
  });
/*
获取所有用户列表
 */
router.get('/users',
  config.auth,
  (req, res) => {
    let authorization = req.header('authorization');
    User.findOne({
      token: authorization.slice(7, authorization.length)
    }, (err, action_user) => {
      User.find(function(err, data) {
        if (err) return console.error(err);
        if (action_user.is_admin) {
          let users = [];
          for (let i in data) {
            if (data[i].name == 'admin') continue;
            users.push({
              id: data[i]._id,
              name: data[i].name,
              is_admin: data[i].is_admin,
              is_teacher: data[i].is_teacher,
              email: data[i].email
            })
          }
          res.send(users);
        } else {
          res.json({
            success: false,
            message: '您不是管理员!'
          });
        }
      })
    })
  });
/*
更改用户类型
 */
router.post('/is_teacher',
  config.auth,
  (req, res) => {
    let authorization = req.header('authorization');
    User.findOne({
      token: authorization.slice(7, authorization.length)
    }, (err, action_user) => {
      if (action_user.is_admin) {
        User.findOne({
          name: req.body.name
        }, (err, user) => {
          user.is_teacher = req.body.is_teacher;
          user.save(function(err) {
            if (err) {
              res.send(err);
            }
          });
          res.json({
            success: true,
            messagez: '操作成功!'
          });

        })
      } else {
        res.json({
          success: false,
          message: '您不是管理员!'
        });
      }
    })
  });


module.exports = router;