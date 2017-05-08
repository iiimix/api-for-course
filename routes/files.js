var qiniu = require('qiniu')
qiniu.conf.ACCESS_KEY = '99_AatpKZ5VE89g3TKKgWomBHc3MlJPWqjZ0f86z'
qiniu.conf.SECRET_KEY = 'exikAD3y_QgQ2asC6BmerR7GuO2U10Ds5ZTXRGqv'

var qs = require('querystring')

function ctreateUploadToken() {

    var bucketName = 'jcw0925'
    var putPolicy = new qiniu.rs.PutPolicy(bucketName)

    //需要返回的数据指定callbackBody
    //更多参考 http://developer.qiniu.com/docs/v6/api/reference/security/upload-token.html
    var callbackBodyObj = {
      name: '$(fname)'
      ,hash: '$(etag)'
      ,imageInfo: '$(imageInfo)'
      ,fsize: '$(fsize)'
      ,key: '$(key)'
      ,ext: '$(ext)'
      ,bucket: '$(bucket)'
    }

    //指定返回数据的接口url： callbackUrl
    //本地开发环境如果不是七牛可以直接访问到的url， 比如localhost:4100//qiniu-callback
    //可以通过ngrok.com来代理
    //参考 https://github.com/zxdong262/qiniu-nodejs-angularjs-demo
    var callbackUrl = 'xxxxx.ngrok.io/qiniu-callback'
    //var callbackUrl = 'your-doamin.x/qiniu-callback'

    //转成字符串， 注意qs会把$转成 "%24", 得转回来
    var callbackBodyStr = qs.stringify(callbackBodyObj).replace(/\%24/g, '$')


    putPolicy.callbackUrl = callbackUrl
    putPolicy.callbackBody = callbackBodyStr

    //putPolicy更多参数参考 http://developer.qiniu.com/docs/v6/sdk/nodejs-sdk.html 上传策略


    return putPolicy.token()

}


//express
app.get('/upload-token', function(req, res) {

  //注意要命名为uptoken
  res.json({
    uptoken： ctreateUploadToken()
  })

})

//koa
app.get('/upload-token', function*(next) {

  //注意要命名为uptoken
  this.body = {
    uptoken： ctreateUploadToken()
  }

}\

