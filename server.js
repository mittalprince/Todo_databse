/**
 * Created by PRINCE MITTAL on 16-07-2017.
 */
const express= require('express');
const bp= require('body-parser');
const db = require('./database');
const app = express()

app.use('/', express.static(__dirname + "/public_static"));
app.use(bp.urlencoded({extended:true}))
app.use(bp.json())

app.get('/todos',(req,res)=>{
    db.gettodo().then(function(todos){
        res.send(todos)
    }).catch(function (err){
        res.send("Error: Could not fetch todos")
    })
})
app.post('/',(req,res)=>{
    db.addtodo(req.body.task).then(function (){
        db.provideposition();
        res.send({success : true})
    }).catch(function(){
        res.send("Error: Can't add todo")
    })
})
app.post('/maketododone',(req,res)=>{
    db.maketododone(req.body.dataid)
    res.send({success:true})
})
// app.post('/removedone',(req,res)=>{
//     db.removedone()
//     res.send({success:true})
// })
app.post('/deletetodo',(req,res)=>{
    db.deletetodo(req.body.dataid)
    res.send({success:true})
})
app.post('/moveup',(req,res)=>{
    db.moveup(req.body.dataid)
    res.send({success:true})
})
app.post('/movedown',(req,res)=>{
    db.movedown(req.body.dataid)
    res.send({success:true})
})
app.listen(6789,()=>{
    console.log("server starts on http://localhost:5678")
})