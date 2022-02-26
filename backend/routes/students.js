var express = require('express');
var router = express.Router();

const Students = require("../models/students");



/* GET home page. */
router.get('/list', function (req, res, next) {
    // 拿到前端拿过来的参数
    // console.log(req.query);
    const { name, page, size } = req.query;
    //拿数据库数据
    // Students.find(name?{name:name}:{},(err,doc)=>{
    //     if(err) throw err;
    //     res.json({
    //         status:0,
    //         result:doc,
    //     });
    // })



    Students.count(name ? { name: name } : {}, (err, count) => {
        if (err) throw err;

        Students.find(name ? { name: name } : {}).skip((page - 1) * size).limit(+size).exec((err, doc) => {
            if (err) throw err;
            res.json({
                status: 0,
                result: doc,
                count: count,
            });
        });

    })
});

//删除接口
router.post('/del', (req, res, next) => {
    console.log(req.body);
    const { id } = req.body;
    if (id) {
        Students.remove({ _id: id }, (err) => {
            if (err) throw err;
            res.json({
                status: 0,
                msg: "删除成功",
            })
        })
    } else {
        res.json({
            status: 1001,
            msg: "参数错误",
        });
    }

})

//新增接口
router.post('/add', (req, res, next) => {
    const { name, age, sex, hobby, phone } = req.body;
    if (!name || !age || !sex || !hobby || !phone) {
        res.json({
            status: 1001,
            msg: "参数错误",
        })
    } else {
        const student = new Students({
            name: name,
            age: +age,
            sex: +sex,
            hobby: hobby,
            phone: +phone
        });
        student.save((err) => {
            if (err) throw err;
            res.json({
                status: 0,
                msg: "新增成功",
            })
        })
    }
})

//获取单个学员的接口
router.post('/get', (req, res, next) => {
    const { id } = req.body;

    Students.findOne({ _id: id }, (err, doc) => {
        if (err) throw err;
        if (doc) {
            res.json({
                status: 0,
                doc: doc,
            })
        } else {
            res.json({
                status: 1002,
                doc: "该学员不存在",
            })

        }
    })
})

//编辑的接口
router.post('/update', (req, res, next) => {
    console.log(req.body);
    const { id, name, age, sex, hobby, phone } = req.body;

    if (id) {
        Students.updateOne({ _id: id }, {
            name: name,
            age: +age,
            sex: +sex,
            hobby: hobby,
            phone: +phone
        }, (err) => {
            if (err) throw err;
            res.json({
                status: 0,
                msg: "更新成功",
            })
        })
    } else {
        res.json({
            status: 1001,
            msg: "参数错误",
        });
    }
});


module.exports = router;