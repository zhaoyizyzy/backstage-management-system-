const { json } = require('express');
var express = require('express');
var router = express.Router();

//用于生成秘钥对
const NodeRSA = require('node-rsa');
//密文的最大长度是512位
const key = new NodeRSA({ b: 512 });
//一种加密的填充方案
key.setOptions({ encryptionScheme: "pkcs1" });

const Users = require("../models/users");

//预登陆接口
router.get('/key',(req,res,next)=>{
  let publicKey = key.exportKey('public') //生成公钥
  res.json({
    key:publicKey,
  })
})

/* GET users listing. */
//登录接口
router.post('/login', function (req, res, next) {
  const { info } = req.body;

  let decrypted = key.decrypt(info,"utf8"); //解密

  const {username,password} = JSON.parse(decrypted);
  if (!username || !password) {
    res.json({
      status: 1001,
      msg: "参数错误",
    })
  } else {
    Users.findOne({ username }, (err, doc) => {
      if (doc) {
        if (doc.password === password) {
          res.json({
            status: 0,
            msg: "登陆成功",
          })
        } else {
          res.json({
            status: 1004,
            msg: "密码错误",
          })
        }
      } else {
        res.json({
          status: 1003,
          msg: "用户名不存在",
        })
      }
    })
  }
});

module.exports = router;
