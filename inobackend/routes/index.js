const express = require('express');
const router = express.Router();
const auth=require("./auth")
const note=require("./note")


router.use("/auth",auth)
router.use("/note",note)

module.exports=router 