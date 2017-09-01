var fs = require("fs")
var path = require("path")
var config = require('../config');
var express = require('express');
var File = require('../models/model_file');

var router = express.Router();

router.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Authorization");
    res.header("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
        // res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// 异步获取路径下的文件列表
readDir = (now_path) => {
        return new Promise((resolve, reject) => {
            fs.readdir(now_path, function(err, files) {
                if (err) {
                    console.log(err);
                    return;
                }
                var count = files.length;
                let folder_list = [];
                files.forEach(function(filename) {
                    fs.stat(now_path + "/" + filename, function(err, stats) {
                        if (stats.isDirectory()) {
                            folder_list.push({
                                name: filename
                            });
                        }
                        count--;
                        if (count <= 0) {
                            resolve(folder_list);
                        }
                    })

                });
            });
        });
    }
    //同步获取路径下的文件列表
readDirSync = (path) => {
    let file_list = [];
    let pa = fs.readdirSync(path);
    pa.forEach(function(ele, index) {
        let info = fs.statSync(path + "/" + ele)
        if (info.isDirectory()) {
            //it's a folder
            // readDirSync(path + "/" + ele);
        } else {
            if (ele != '.DS_Store') {
                info.name = ele.slice(0, ele.lastIndexOf('.'));
                info.type = ele.slice(ele.lastIndexOf('.') + 1, ele.length);
                file_list.push(info)
            }
        }
    })
    return file_list;
}


router.get('/grade_list',
    config.auth,
    (req, res) => {
        readDir(path.join(__dirname, '../static/')).then((list) => {
            res.send(list);
        })
    });

router.get('/file_list',
    // config.auth,
    (req, res) => {
        File.find(function(err, data) {
            if (err) return console.error(err);
            if (req.query.grade == undefined) {
                res.send(data)
            } else {
                let files = [];
                for (let i in data) {
                    if (data[i].grade == req.query.grade) {
                        files.push(data[i])
                    }
                }
                res.send(files);
            }
        })

    });

// router.get('/file_list',
//     // config.auth,
//     (req, res) => {
//         let grade = req.query.grade;
//         let file_list = readDirSync(path.resolve(__dirname, '../static/' + grade));
//         res.send(file_list)
//     })



module.exports = router;