const express = require("express")
const router = express.Router()
const authGuord=require("../midleware/authGord")
const userController=require("../controller/notes.controller")

router.post("/",authGuord,userController.addNote)
router.put("/update/:id",authGuord,userController.updateNote)
router.get("/",authGuord,userController.getNoteDetails)
router.delete("/:id",authGuord,userController.deleteNoteDetails)
module.exports=router