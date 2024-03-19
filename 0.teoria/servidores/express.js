const express = require("express")

const app = express()

app.get("/",(req,res)=>{
    res.send("home from express")
})

app.listen(8080, ()=> {
    console.log("listening to http://localhost:8080")
})