const {customer} = require('../models/index');
const encryptpassword = require('../utility/encryptPassword');
const  notificaciones = require('../utility/index');
const {GenerateOtp,GenerateExpiry,onRequestOTP} = require('../utility/Notificaciones');
const {generateSignature} = require('../utility/encryptPassword');

const CustomerSignUp = async(req,res)=>{
    const {email,phone,password} = req.body;
      console.log(req.body);
      if(!email.includes('@') && !email.endsWith('.com')) return res.status(400).json({message : 'Email invalid!!'});
      if(phone.length<1) return res.status(400).json({message : "Phone no Found"});
      if(password.length<8) return res.status(400).json({message : "password must have a minimum of 8 characters!"});
    

       const salt = await encryptpassword.genSalt();
       const Userpassword = await encryptpassword.encryptPassword(password,salt);
  
       const otp= await  GenerateOtp();
       const expiry = await GenerateExpiry();
       console.log(otp);

      const newCustomer = {
          email,
          phone: phone,
          salt : salt,
          password : Userpassword,
          otp : otp,
          otp_expiry  : expiry,
          firstName : '',
          lastName : '',
          address : '',
          verified : false,
          lat : 0,
          lng : 0
           
      }
       console.log(newCustomer);

      const result = await customer.create(newCustomer);

        if(result) {
            console.log(phone);
            await onRequestOTP(otp,phone);

            const signature = generateSignature({
                _id : result._id,
                email : result.email,
                verified : result.verified
            });

            return res.status(201).json({signature : signature, verified : result.verified, email : result.email});

        }
         return res.status(400).json({message : "Error with SignUp"});
}


const CustomerLogin = async(req,res)=>{

}

const CustomerVerify = async(req,res)=>{

}


const RequestOtp = async(req,res)=>{
    
}


const GetCustomerProfile = async(req,res)=>{

}


const EditCustomerProfile = async(req,res)=>{

}

module.exports = {
    CustomerSignUp,
    CustomerLogin,
    CustomerVerify,
    GetCustomerProfile,
    RequestOtp,
    EditCustomerProfile
}
