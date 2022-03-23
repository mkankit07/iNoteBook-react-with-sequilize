const express = require("express")
const router = express.Router()
const authGuord=require("../midleware/authGord")
const userController=require("../controller/useControoler")
router.post("/sign",userController.createUser)
router.post("/login",userController.login)
router.get("/",authGuord,userController.getUser)
module.exports=router

// editPoll: async function(req,res){

//     try {

//         let isActive=req.body.isActive;
//         let status="saved";
//         if(isActive==true){
//             status="active";
//         }
//         let pollId=req.body.pollId;
//         let date1=Date.parse(req.body.startDate);
//         let startDate=new Date(date1);
//         let date2=Date.parse(req.body.endDate)
//         let endDate=new Date(date2);
//         let newPoll=await Poll.update({
//             pollName:req.body.pollQuestion,
//             pollQuestion:req.body.pollQuestion,
//             topicId:req.body.topicId,
//             status:status,
//             endDate,
//             startDate
//         },
//         {
//             where:{
//                 id:pollId,
//             }
//         })
//         let optionsArr=req.body.options;
//         let options=[];
//         // const getPoll=await PollQuestionOption.findOne({where:{PollId:pollId},attributes:['option']}) 
//         for(let i=0;i<optionsArr.length;i++){
//             let  obj={
//                 option:optionsArr[i],
//                 status:status,
//                 pollId:pollId
//             }
//             options.push(obj)
//             // let pollQuestionOption= await PollQuestionOption.update(obj,
//             //     {
//             //         where:{
//             //             pollId:pollId,
//             //         }
//             //     })
//         // }
//         let opts={
//             returning:true
//         }

//         let pollQuestionOption=await PollQuestionOption.update(options,opts,
//         {
//             where:{
//                 pollId:pollId,
//             }
//         })
//         // console.log("newPoll",newPoll)
//         // console.log("pollOption",pollQuestionOption)

//         return res.json({
//             status:true,
//             message:"poll updated"
//         })
//     }
//     } catch (error) {
//         console.log("errorrrr", error)
//         return res.json(500,{
//             status:false,
//             message:"internal server error"
//         })

//     }
// },