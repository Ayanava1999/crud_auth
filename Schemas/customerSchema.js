const mongoose =require('mongoose')

const customerschema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    gender:{
        type: String,
        enum:["m","f"]
    },
    number:{
        type: String,
        unique: true
    },
    username:{
        type: String,
        require: true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }
});

const CUSTOMER = mongoose.model('Test', customerschema);

module.exports=CUSTOMER