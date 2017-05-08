const fs = require("fs")
const path = require("path")
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

let grade_list = [];


readDir = (now_path) => {
    fs.readdir(now_path, function(err, menu) {
        if (!menu)
            return;
        menu.forEach(function(ele) {
            fs.stat(now_path + "/" + ele, function(err, info) {
                if (info.isDirectory()) {
                    // console.log("dir: "+ele)  
                    grade_list.push(ele);
                    readDir(now_path + "/" + ele);
                } else {
                    // file_list.push(ele);
                    // console.log("file: " + ele)
                }
            })
        })

    })
}
readDir(path.join(__dirname));

readDirSync = (path) => {
    let file_list = [];
    let pa = fs.readdirSync(path);
    pa.forEach(function(ele, index) {
        // console.log(ele)
        let info = fs.statSync(path + "/" + ele)
        if (info.isDirectory()) {
            // console.log("dir: " + ele)
            readDirSync(path + "/" + ele);
        } else {
            if(ele!='.DS_Store')file_list.push(ele);
            // console.log("sync_getfile: " + ele)
        }
    })
    // console.log(file_list);
    return file_list;
}



// readDirSync(path.resolve(__dirname, '../routes/college_one'));
// readDirSync(path.resolve('./college_one'));

router.get('/grade', function(req, res) {
    // res.json(grade_list);
    res.send(grade_list)
});


router.get('/file_list', function(req, res) {
    let grade = req.query.grade;
    let file_list =  readDirSync(path.resolve(__dirname, '../routes/' + grade));
    res.send(file_list)
})

module.exports = router;