const express = require('express')
const Doctor =require('../models/user')
const router = new express.Router()
router.post('/addDoctor',async(req,res)=>{
    const data =new Doctor(req.body)
    try{
 await data.save()
 res.status(200).send({
     status:1,
     data:data ,
     msg:'data inserted'
 })
    }
    catch(e){
res.status(500).send({
    status:0,
    data:e,
    msg:'error inserting data'
})
    }
})
router.get('allDoctors',async(req,res)=>{
    try{ const doctors = await Doctor.find({})
    res.status(200).send({
status:1,
data:doctors,
msg:'All Doctors Selected'
    })
}
   catch(e){
       res.status(500).send({
           status:1,
           data:e,
           msg:'error Loading Doctors Data'
       })
   }

})

router.get('/Doctor:id',async(req,res)=>{
    _id=req.params._id
    try{
          const doctor = await Doctor.findById(_id)
          if(!doctor){
              res.status(200).send({
                  status:2,
                  data:'',
                  msg:'Doctor Not Found'
              })
          }
          res.status(200).send({
              status:1,
              data:doctor,
              msg:"doctor data retrieved successfully"
          })
    }catch(e){
        res.status(500).send({
            status:0,
            data:e ,
            msg:'error Loading Data'
        })



    }
})
router.patch('/doctor/:id', async(req,res)=>{
  const _id = req.params.id
  const updates= req.body
    const updateKeys = Object.keys(req.body)
    const allowUpdates=["name","age","email"]
    const validUpdates = updateKeys.every((u)=>allowUpdates.includes(u))
    if(!validUpdates)
    res.status(200).send({
        status:2,
        data:'',
        msg:"invalid updates"
    })
    try{
        const doctor =await Doctor.findByIdAndUpdates(_id,updates,{
            new:true ,
            runValidators:true
        })
        if(!doctor){
            res.status(200).send({
status:2,
data:"",
msg:"Doctor Not Found"
            })
        }
        res.status(200).send({
            status:1,
            data:doctor,
            msg:"successfully"
        })
    } catch(e){
res.status(500).send({
    status:0,
    data:"",
    msg:"error edit data "

})
    }
})
router.delete('/doctor/:id',async(req,res)=>{
    const _id = req.params.id
    try{
        const doctor = await Doctor.findByIdAndDelete(_id)
        if(!doctor){
            res.status(200).send({
status:2,
data:"",
msg:"Doctor Not Found"
            })
        }
        res.status(200).send({
            status:1,
            data:doctor,
            msg:"successfully"
        })
    }catch(e){
        res.status(500).send({
            status:0,
            data:"",
            msg:"error delete data"
        })
    }
})
router.post('/login',async(req,res)=>{
    try{
const doctor =await Doctor.findByCredentials(req.body.email,req.body.pass)
res.send({
    status:1,
    data:doctor,
    msg:"logged In"
})
    }
    catch(e){
res.status(500).send({
    status:0,
    data:e,
    msg:"err in data"
})

    }
})
module.exports=router