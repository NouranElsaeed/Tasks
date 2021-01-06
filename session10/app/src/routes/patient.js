const express = require('express')
const Patient =require('../models/patient')
const router = new express.Router()
router.post('/addPatient',async(req,res)=>{
    const data =new Patient(req.body)
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
router.get('allPatients',async(req,res)=>{
    try{
         const patients = await Patient.find({})
    res.status(200).send({
status:1,
data:patients,
msg:'All Patients Selected'
    })
}
   catch(e){
       res.status(500).send({
           status:1,
           data:e,
           msg:'error Loading Patients Data'
       })
   }

})

router.get('/Patient:id',async(req,res)=>{
    _id=req.params._id
    try{
          const patient = await Patient.findById(_id)
          if(!patient){
              res.status(200).send({
                  status:2,
                  data:'',
                  msg:'Patient Not Found'
              })
          }
          res.status(200).send({
              status:1,
              data:patient,
              msg:"Patient data retrieved successfully"
          })
    }catch(e){
        res.status(500).send({
            status:0,
            data:e ,
            msg:'error Loading Data'
        })



    }
})
router.patch('/patient/:id', async(req,res)=>{
  const _id = req.params.id
  const updates= req.body
    const updateKeys = Object.keys(req.body)
    const allowUpdates=["name","email"]
    const validUpdates = updateKeys.every((u)=>allowUpdates.includes(u))
    if(!validUpdates)
    res.status(200).send({
        status:2,
        data:'',
        msg:"invalid updates"
    })
    try{
        const patient =await Patient.findByIdAndUpdates(_id,updates,{
            new:true ,
            runValidators:true
        })
        if(!patient){
            res.status(200).send({
status:2,
data:"",
msg:"Patient Not Found"
            })
        }
        res.status(200).send({
            status:1,
            data:patient,
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

router.post('/login',async(req,res)=>{
    try{
const patient =await Patient.findByCredentials(req.body.email,req.body.pass)
res.send({
    status:1,
    data:patient,
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