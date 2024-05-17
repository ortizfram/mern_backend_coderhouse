const cookieParser = require("cookie-parser")
const express = require("express")
const app = express()
const session = require("express-session")
const FileStore = require("session-file-store")

const fileStorage = FileStore(session)
app.use(cookieParser())
app.use(session({
    store: new fileStorage({path:'/sessions',ttl:100,retries:0}),
    secret:"secret",
    resave:false,
    saveUninitialized:false
}))