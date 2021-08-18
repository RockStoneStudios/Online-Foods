const {model,Schema} = require('mongoose');


const customerSchema  = new Schema({
    email : {
        type : String,
        required : true
    },
    salt : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    
    firstName : {
        type : String,
   
    },
    lastName : {
        type : String,
    
    },
    address : {
        type : String
    },
    phone : {
        type : String,
        required : true
    },
     verified : {
         type : Boolean,
         required : true
     },
     otp : {
         type : Number,
         required : true
     },
     otp_expiry : {
         type : Date,
         required : true
     },
     lat : {
         type : Number,
     },
      lng : {
          type : Number
      },
    },{
        toJSON : {
            transform(doc,ret){
                delete ret.__v;
                delete ret.createdAt;
                delete ret.updatedAt;
            }
        
        },
          timestamps : true
      
});


module.exports = model('Customer',customerSchema);


