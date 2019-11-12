const express = require('express');
const router = express.Router();
const mysql = require('../sql/mysql');

const {
  login,
  reg,
  getStudent,
  postStudent,
  deleteStudent
} = mysql;


/**
 *  api
 */
router.get('/', function(req, res, next) {
  res.send('/api');
});

router.post('/login', function (req, res) {
  login(req, res);
});

router.post('/reg', function (req, res) {
  reg(req, res);
});

router.get('/getStudent/:user_id', function (req, res) {
  // 前端通过url: `/getStudent/${user_id}`将user_id传递过来
  // 后端端通过req.params.user_id接收
  getStudent(req, res);
});

// 添加和修改
router.post('/postStudent/:user_id', function (req, res) {
  postStudent(req, res);
});

router.post('/deleteStudent/:user_id', function (req, res) {
  deleteStudent(req, res);
});

router.post('/fileUpload', function (req, res) {  });

/**
 *  api --- end
 */


module.exports = router;
