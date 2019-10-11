/**
 *  数据库连接
 */
let my_mysql      = require('mysql');
let conn = my_mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'nodejs'
});
conn.connect();


/**
 * 各种处理函数
 * @param req
 * @param res
 */
function login(req, res) {
    let loginData = req.body;
    let LoginResult = null;
    let sql = 'SELECT * FROM reg';
    conn.query(sql,  function (err, result) {
        if(err){
            res.send({code:1, msg: '查询数据库错误'});
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        // console.log("-------------所有注册用户的数据----------------: ");
        // console.log(result);
        // console.log("-------------所有注册用户的数据 end----------------: ");
        LoginResult = {code:1,msg:'账号或者密码不对 (-_-)'};

        for (let i = 0; i < result.length; i++) {
            if (result[i].account === loginData.account && result[i].pwd === loginData.pwd) {
                LoginResult = {code:0,msg:'登录成功'};
                break;
            }
        }
        res.send(LoginResult)
    });
}

function reg(req, res) {
    console.log("req.body: ", req.body);
    let sql = "INSERT INTO reg(nick, account, pwd) VALUES(?,?,?)";
    let sqlVal = [req.body.nick, req.body.account, req.body.pwd];

    conn.query(sql, sqlVal, function (err, result) {
        if (err) {
            res.send({code:1, msg: err});
            console.log("err: ", err);
        } else {
            res.send({code:0,msg: '注册成功'});
        }
    })
}

function getStudent(req, res) {
    conn.query('select * from student ', function (err, result) {
        if (err) {
            res.send({code:1, msg: err});
            console.log("err: ", err);
        } else {
            res.send({code:0, msg: "success", data: result})
        }
    })
}


function postStudent(req, res) {
    console.log("req.body: ", req.body);
    // 有id就修改
    if (req.body.id) {
        let sql = 'update student set name=?, age=?, student_number=?, chinese=?, math=?, english=? WHERE id = ' + req.body.id;
        let sqlVal = [req.body.name, req.body.age, req.body.student_number, req.body.chinese, req.body.math, req.body.english ];
        conn.query(sql, sqlVal, function (err, result) {
            if (err) {
                res.send({code:0, msg: err});
                console.log("err: ", err);
            } else {
                res.send({code:0, msg: "修改成功"});
            }
        });
        return;
    }

    // 没有id就添加
    let sql = 'insert into student(name,age,student_number,chinese,math,english) values(?,?,?,?,?,?)';
    let sqlVal = [req.body.name, req.body.age, req.body.student_number, req.body.chinese, req.body.math, req.body.english];
    conn.query(sql, sqlVal, function (err, result) {
        if (err) {
            console.log("err: ", err);
            res.send({code:1, msg: err});
        } else {
            res.send({code:0, msg: "添加成功"});
        }
    })
}

function deleteStudent(req, res) {
    console.log("req.body.id: ", req.body.id);
    conn.query('DELETE FROM student where id= ' + req.body.id, function (err, result) {
        if (err) {
            res.send({code:1, msg: err});
            console.log("err: ", err);
        }
        else {
            res.send({code:0, msg: "删除成功"})
        }
    })
}

/**
 * 处理函数 end
 */



module.exports = {
    login,
    reg,
    getStudent,
    postStudent,
    deleteStudent
};
