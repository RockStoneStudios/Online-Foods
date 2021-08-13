const Vandor = require('../models/index');
const encryptPassword = require('../utility/index');

  
const findVandor = async(id,email) =>{
     if(email) {
         return await Vandor.vandor.findOne({email : email})
     }
     else {
         return await Vandor.vandor.findById(id);
     }
}

const createVandor = async(req,res)=>{
   const {name,address,pincode,foodType,email,password,ownerName,phone} = req.body;

      const userEmail = await findVandor('',email);
       if(userEmail){
           res.json({message : "A vandor is exist with this email Id"});
       }
     const salt = await encryptPassword.genSalt();
     const userPassword = await encryptPassword.encryptPassword(password,salt);
   const createVandor = await Vandor.vandor.create({
       name,
       address,
       pincode,
       foodType,
       email,
       password : userPassword,
       salt : salt,
       ownerName,
       phone,
       rating : 0,
       serviceAvailable : false,
       coverImages : [],
       foods : []
   });

   res.json(createVandor);
}

const getVandors = async(req,res)=>{
  const vandors = await Vandor.vandor.find();
   if(vandors.length<1) return res.json({message : "vandor data not available"});
   res.json(vandors);
}

const getVandorById = async(req,res)=>{
    const vandorId = await findVandor(req.params.id);
     if(vandorId) return res.json(vandorId);
     res.json({message : "Vandor Data not Available"});
}


module.exports = {
    createVandor,
    getVandors,
    getVandorById,
    findVandor
}