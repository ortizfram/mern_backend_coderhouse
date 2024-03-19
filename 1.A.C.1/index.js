const express = require("express")

const app = express()

app.get("/",(req,res)=>{
    
    res.send('<ul><li><button><a href="/bienvenida">bienvenida</a></button></li><li><li><button><a href="/usuario">usuario</a></button></li><li></ul>');
})
app.get("/bienvenida",(req,res)=>{
    res.send('<h1 style="color: blue;">Bienvenida page</h1>');
})
app.get("/usuario",(req,res)=>{
    res.send({nombre:"jorge",apellido:"guagua", edad:80, correo:"a@google.com"});
})

app.listen(8080, ()=> {
    console.log("listening to http://localhost:8080")
})