var express = require('express');
var bodyparser=require('body-parser');
var multer = require('multer');

var app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));


app.use(express.static('/views'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/views/form.html");
})


app.post('/getData',(req,res)=>{
    var name=req.body.username;
    var email=req.body.email;
    var contact=req.body.contact;
    var loc=req.body.location;

    res.send("Name: " +name+ " , Email: " +email+ " , contact: " +contact+ " ,location: " +loc);
    console.log("name",name);
})


app.get('/uploadfile',(req,res)=>{
    res.sendFile(__dirname+"/views/fileupload.html");
});

var st=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads");
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});

var fileupload=multer({storage:st}).single('image');


app.post('/upload',(req,res)=>{
   fileupload(req,res,(err)=>{
       if(err){
       console.log("file uploading failed " +err);
       res.send(err);
       }
       else
       {
       console.log("file uploaded succesfully");
        res.send("file uploaded successfully");
       }
   })
})


app.listen(3000,(err)=>{
    if(err){ console.log(err)}
    else { console.log("server is running at http://localhost:3000")}
})


// http:localhost:3000/getData?username=jatin&email=