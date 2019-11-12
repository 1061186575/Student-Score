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
    let sql = 'SELECT * FROM user';
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
                LoginResult = {code:0,msg:'登录成功',data:{user_id: result[i].user_id,nick: result[i].nick}};
                break;
            }
        }
        res.send(LoginResult)
    });
}

function reg(req, res) {
    console.log("req.body: ", req.body);

    // 查询用户名是否已经存在
    conn.query('SELECT * FROM user',  function (err, result) {
        if(err){
            res.send({code:1, msg: '查询数据库错误'});
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        for (let i = 0; i < result.length; i++) {
            if (result[i].account === req.body.account) {
                res.send({code:1,msg:'用户名已经存在'});
                console.log("用户名已经存在");
                return;
            }
        }
        console.log("register");
        register();
    });

    function register() {
        let sql = "INSERT INTO user(nick, account, pwd) VALUES(?,?,?)";
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
}

function getStudent(req, res) {
    conn.query('select * from student where user_id =' + req.params.user_id, function (err, result) {
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
    if (req.body.id) { // 修改不用user_id也没关系
        let sql = `update student set name=?, age=?, student_number=?, chinese=?, math=?, english=? WHERE user_id = ${req.params.user_id} and id = ${req.body.id}`;
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
    let sql = 'insert into student(user_id,name,age,student_number,chinese,math,english) values(?,?,?,?,?,?,?)';
    let sqlVal = [req.params.user_id, req.body.name, req.body.age, req.body.student_number, req.body.chinese, req.body.math, req.body.english];
    conn.query(sql, sqlVal, function (err, result) {
        if (err) {
            console.log("err: ", err);
            res.send({code:1, msg: err});
        } else {
            res.send({code:0, msg: "添加成功"});
        }
    })
}

function deleteStudent(req, res) { // 删除不用user_id也没关系
    console.log("req.body.id: ", req.body.id);
    conn.query(`DELETE FROM student where user_id = ${req.params.user_id} and id= ${req.body.id}`, function (err, result) {
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
