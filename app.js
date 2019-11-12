var express = require('express');
var path = require('path');
var app = express();
var apiRouter = require('./routes/api');


const bodyParser = require('body-parser');
app.use(bodyParser.json());//数据JSON类型
app.use(bodyParser.urlencoded({ extended: false }));//解析post请求数据



app.use('/api', apiRouter);
app.use(express.static(path.join(__dirname, 'public')));

/**
 *  router
 */
app.get('/', function (req, res) {
    res.redirect('./index.html');
});

app.get('/404.html', function (req, res) {
    // redirect
    res.redirect('./index.html');
});
/**
 *  router --- end ---
 */



console.log("启动服务器的时间: ", new Date().toLocaleString());
console.log("打开浏览器访问: http://localhost:3000/");


app.listen(3000);

