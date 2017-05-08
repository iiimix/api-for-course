## 基于 Node Express Mongoose 实现的用户注册/登陆权限验证

### 项目介绍

* 路由设计
    * POST /api/signup: 用户注册
    * POST /api/user/accesstoken: 账号验证,获取token
    * GET /api/user/info: 获得用户信息,需验证

* user 模型
    * name : 用户名
    * password: 密码
    * token: 验证相关token
    
* 目录结构
                  
      ├── index.js                        入口页面
      ├── passport.js                     配置权限模块所需功能
      ├── package.json                    npm包配置文件
      ├── config.js                       配置MongoDB数据库连接和token的密钥。
      ├── models                          模型文件夹    
      │   └── user.js                         用户模型
      ├── routers                         路由相关文件    
      │   ├── index.js                         路由入口
      │   └── users.js                         根组    
      ├── static                          可以删除
      └── README.md  

* 依赖包
    * express : 基于 Node.js 平台的 web 应用开发框架
    * mongoose: 与MongoDB数据库进行交互的框架,需提前安装好mongodb并开启mongodb服务
    * morgan: 将程序请求过程的信息显示在Terminal中，方便调试
    * jsonwebtoken : 用来生成token
    * passport: 权限验证库
    * bcryptjs: 对用户密码进行hash加密。bcrypt的优化版，不需要安装任何依赖

```
  {
    "dependencies": {
      "bcryptjs": "^2.4.3",
      "body-parser": "^1.15.2",
      "express": "^4.14.0",
      "jsonwebtoken": "^7.1.9",
      "mongoose": "^4.7.1",
      "morgan": "^1.8.1",
      "passport": "^0.3.2",
      "passport-http-bearer": "^1.0.1"
    }
  }

```

### 运行  

`git clone https://github.com/gooyoung/Node-Auth.git`  

`npm install`  

`node index`

服务器运行在 `localhost:8080/`

### 使用 Postman 测试

#### 注册一个账号  

* url：localhost:8080/api/signup
* method：POST   

设置`body`的`Content-Type`为`x-www-form-urlencoded` 以便我们的`body-parser`能够正确解析。   

| key      | value  |
| -------- | :----: |
| name     | zivhe  |
| password | 123456 | 

![image](https://raw.githubusercontent.com/gooyoung/Node-Auth/master/static/1.jpg)

用MongoChef连接数据库可以看到password被加密保存了  

![image](https://raw.githubusercontent.com/gooyoung/Node-Auth/master/static/2.jpg)

#### 获取专属token   

* url：localhost:8080/api/user/accesstoken
* method：POST 

![image](https://raw.githubusercontent.com/gooyoung/Node-Auth/master/static/3.jpg)  

如果name或者password输错会返回验证失败。

#### 获取用户信息
  
* url：localhost:8080/api/user/info
* method：GET 
在head中加入token信息

![image](https://raw.githubusercontent.com/gooyoung/Node-Auth/master/static/4.jpg)

