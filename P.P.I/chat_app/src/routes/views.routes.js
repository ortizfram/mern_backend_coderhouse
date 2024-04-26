// P.P.I/chat_app/src/routes/views.routes.js
const express = require("express")
const router = express.Router()

router.get("/", (req,res)=>{
    res.render("index", {})
})

module.exports = router