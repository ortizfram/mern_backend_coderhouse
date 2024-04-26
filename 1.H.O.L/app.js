import express from"express"
import userRouter from "./routers/users.routes.js"
import petsRouter from"./routers/pets.routes.js"

const app = express()
app.use(express.json())
app.use(express.static("public"))

app.use("/api", userRouter)
app.use("/api", petsRouter)

const port = 3131
app.listen(port, ()=>{
    console.log(`listening ${port}`)
})