const express = require("express")

const app = express()
app.use(express.json())

// usar estaticos
app.use('/', express.static(__dirname + '/public'))


app.use("/", (req,res)=>{
    res.send("home")
})

const port = 3131
app.listen(port, ()=>{
    console.log(`listening ${port}`)
})