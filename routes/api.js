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

router.get('/getStudent', function (req, res) {
  getStudent(req, res);
});

// 添加和修改
router.post('/postStudent', function (req, res) {
  postStudent(req, res);
});

router.post('/deleteStudent', function (req, res) {
  deleteStudent(req, res);
});

router.post('/fileUpload', function (req, res) {  });

/**
 *  api --- end
 */


module.exports = router;
