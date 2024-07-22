const express = require("express");
const router = express.Router();

router.get("/", (req,res)=>{
 res.render("changeRoles", {});
});
router.put("/premium/:uid", (req,res)=>{
 
});
router.put("/admin/:uid", (req,res)=>{
 
});
router.put("/user/:uid", (req,res)=>{
 
});

module.exports = router;

