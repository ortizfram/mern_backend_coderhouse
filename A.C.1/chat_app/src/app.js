const express = require("express")
const handlebars = require("express-handlebars")
const viewsRoutes = require("./routes/views.routes.js")
const {Server} = require("socket.io")

const app = express()
const httpServer = app.listen(8080, ()=>console.log("Listening port 8080"))

const io = new Server(httpServer) //pass server to socket

// listen app events
let messages=[]
io.on("connection", socket=>{
    console.log("nuevo cliente conectado")

    socket.on("message", data=>{
        messages.push(data)
        io.emit('messageLogs', messages)
    })
})

app.engine('handlebars', handlebars.engine())
app.set("views", __dirname+"/views")
app.set("view engine", 'handlebars')
app.use(express.static(__dirname+"/public"))
app.use("/", viewsRoutes)

