const http = require("http")

const app = http.createServer((req,res)=>{
    res.end("home from http")
})

app.listen(8080, ()=>{
    console.log("listening to http://localhost:8080")
})