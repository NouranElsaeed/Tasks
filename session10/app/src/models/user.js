const validator = require('validator')
const Patient=require('./patient')
var bcrypt = require('bcryptjs');
const mongoose = require('mongoose')
    const DoctorSchema = new mongoose.Schema({

    name:{
        type:String,
        required: true,
        trim: true,
        minLength:10,
        maxLength:50
    },
    username:{
        type: String,
        required: true,
        unique: true,
        trim:true,
        lowercase: true
    },
    email:{
        type:String,
        required: true,
        unique: true,
        trim:true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error ('invalid email')
        }
    },
    pass:{
        type:String,
        minLength:6,
        maxLength:100,
        trim:true ,
        validate(value){
            if(value.toLowerCase().includes('nouran')) throw new Error('invalid pass')

        }
    },
    status:{
        type: Boolean, default: true
    },
    specialize :{
        type:String,
        required: true,
        trim: true
       // minLength:100,
     //   maxLength:500
    },
    phone:{
        type:String,
        minLength:11,
        maxLength:15
    },
    whatsapp:{
        type:String,
        minLength:11,
        maxLength:15
    },
    address:{
        type:String,
        required: true,
        trim: true,
      //  minLength:10,
      //  maxLength:100
    }
})
DoctorSchema.virtual('Patient',{
    ref:'Patient', localField:'_id', foreignField:'owner'
})
DoctorSchema.methods.toJSON = function(){
     const doctorobj =  this.toObject()
     delete doctorobj.pass
     return doctorobj
 }
DoctorSchema.pre('save' , async function(next){
    
    doctor=this
    if(doctor.isModified('pass'))
    doctor.pass=await bcrypt.hash(doctor.pass,12)
    next()
})
const Doctor = mongoose.model('Doctor',DoctorSchema)
module.exports = Doctor
