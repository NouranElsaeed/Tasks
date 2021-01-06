const mongoose = require('mongoose')
const validator = require('validator')
var bcrypt = require('bcryptjs');
    const PatientSchema = new mongoose.Schema({

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
    history:{
        type:String,
        minLength:6,
        maxLength:100,
        trim:true ,
        required: true,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Doctor'
    }
})
PatientSchema.methods.toJSON = function(){
    const patientobj =  this.toObject()
    delete patientobj.pass
    return patientobj
}
PatientSchema.pre('save' , async function(next){
   
   patient=this
   if(patient.isModified('pass'))
   patient.pass=await bcrypt.hash(patient.pass,12)
   next()
})
const Patient = mongoose.model('Patient',PatientSchema)

module.exports = Patient