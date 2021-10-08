const express= require('express');//imports express js - web framework for node js - handles templating and routing
// var bodyParser = require('body-parser');//enable the express app to read the incoming body - parse req.body as a JSON  --> deprecated json and urlencode added to express to provide body parsing support out of the box.
var logger = require('morgan');//for logging all http request 
var methodOverride = require('method-override')//allows to use put and delete request
var mysql = require('mysql');
var cors = require('cors');//cross origin resource sharing enables ionic to communicate with server
var http = require('http');
var fs = require('fs');
// var Bcrypt = require('bcrypt'); // Encrypting /salting passwords

const app= express();
const port=8080;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(methodOverride());
app.use(cors({
    origin: '*'
}));


var con = mysql.createConnection({
    host: "sql482.main-hosting.eu",
    user: "u191494829_shangkaul",
    password:"?6JVqN2F6Rq",
   database:"u191494829_sql_playground",
 
  });
  con.connect((err)=> {
    if (err) throw err;
    console.log("Connected!");})

app.get('/',(req,res)=>{
    console.log("/ hit GET")
    res.send("Hello World");
});

app.get("/all", (req, res) => {
    var sql="SELECT * from users";
    con.query(sql,(err,result)=>{
         
        if(err){
            console.log(err);
            res.json({success:false,status:400})
        }
        else{
            res.json({
                success:true,
                status:200,
                data:result
            });
            console.log("All users queried");
        }
    })
});

app.post('/add',(req,res)=>{
    // console.log(req.body);
   
    const name=req.body.name;
    const desig=req.body.desig;
    const dept=req.body.dept;
    
    var sql='INSERT INTO users (name,desig,dept) VALUES ("'+name+'","'+desig+'","'+dept+'")';
        con.query(sql, function (err, result) {
            if (err){
                console.log(err);
                res.json({
                    success:false,
                    status:400
                })
            }
            else
            {
                res.json({
                    success:true,
                    status:200
                })
            console.log("Data successfully entered!");}
          });
    });



app.post('/del',(req,res)=>{
    // console.log(req.body);
    const id=req.body.id;
            
        var sql='delete from users where id="'+id+'"';
            con.query(sql, function (err, result) {
                if (err){
                    console.log(err);
                    res.json({
                        success:false,
                        status:400
                    })
                }
                else
                {
                    res.json({
                        success:true,
                        status:200
                    })
                console.log("User deleted!");}
              });
    });

app.listen(process.env.PORT||2002,()=>{
    console.log("Server running at localhost:"+process.env.PORT)
});