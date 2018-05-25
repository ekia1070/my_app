const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');

app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './user_views');

const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234abc",
    database : "mydb"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("DB Connected");
});

app.use('/js', express.static(__dirname+"/js/"));
app.use('/css', express.static(__dirname+"/css/"));
app.use('/images', express.static(__dirname+"/images/"));

app.use(session({
    secret: '@#@$M2O#@$#$',
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));

const uploads = require('./routes/upload');
app.use('/upload', uploads);
app.use('/upload', express.static('uploads'));

// app.get("/", function(req,res){
//     fs.readFile("login.html", function(err, data) {
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.write(data);
//         res.end();
//     });
// });

app.get("/", function(req,res) {
    res.render('login', {});
});

app.get("/template", function(req,res) {
   res.render('index_template', {cur_time:Date()});
});

app.get("/login", function(req,res) {
   const sess = req.session;

   if(sess.userid) {
       res.render('login_success', { userid : sess.userid });
       res.end();
   } else {
       console.log("Not Login user");
       res.redirect('/');
   }

});

app.post("/login", function(req,res) {

    const sess = req.session;

    const userid =  req.body.id;
    const userpw =  req.body.pw;

    const sql = "SELECT id, pw FROM `tb_user` WHERE id = '" + userid + "' AND pw = '" + userpw + "'";
    con.query(sql, function(err, result, fields) {
       if (err) throw err;

       if(result[0] != undefined) {
           // res.write("로그인 하신 ID는 " + result[0].id + " 입니다.");
           // res.end();
           sess.userid = userid;
           res.render('login_success', { userid : sess.userid });
           res.end();
       } else {
           // fs.readFile("login_fail.html", function(err, data) {
           //     res.write(data);
           //     res.end();
           // });
           res.render('login_fail',{});
           res.end();
       }
    });

});

app.get('/logout', function(req,res) {
   sess = req.session;
   if(sess.userid) {
       console.log("Logout Execute");
       req.session.destroy(function(err){
          if(err) {
              console.log(err);
          } else {
              res.redirect('/');
          }
       });
   } else {
       console.log("Logout Not Execute");
       res.redirect('/');
   }
});

app.post("/ajaxText", function(req,res) {
    if(req.body.testVal == 'Test') {
        res.status(200).json({"result":"Success"});
        res.end();
    } else {
        res.status(200).json({"result":"Fail"});
        res.end();
    }
});

var port = 1337;
app.listen(port, function() {
   console.log("Server Start!");
});