const express = require("express")
const router = express.Router()
const authGuord=require("../midleware/authGord")
const userController=require("../controller/useControoler")
router.post("/sign",userController.createUser)
router.post("/login",userController.login)
router.get("/",authGuord,userController.getUser)
module.exports=router

