# 学生成绩管理系统


### 启动方式
先创建一个"nodejs"数据库,  
然后把/sql目录下的mysql.js的"数据库连接"配置改成自己的数据库信息,  
在nodejs数据库里创建user表和student表,  
user表新增user_id(自增),nick,account,pwd 4个字段,  
student表新增id(自增),user_id(自增),name,age,student_number,chinese,math,english 8个字段,  
启动自己的数据库,  
然后执行下面的操作.  

``` bash
# 1.安装node.js (下载安装即可)

# 2.安装依赖
npm install express mysql --save-dev

# 3.运行服务 
npm run dev

```
然后打开浏览器访问: <http://localhost:3000/>




