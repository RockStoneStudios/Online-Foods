const {customer} = require('../models/index');
const encryptpassword = require('../utility/encryptPassword');
const  notificaciones = require('../utility/index');
const {GenerateOtp,GenerateExpiry,onRequestOTP} = require('../utility/Notificaciones');
const {generateSignature} = require('../utility/encryptPassword');
const Customer = require('../models/Customer');
const {passwordCompare} = require('../utility/encryptPassword');

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
        
        const existingCustomer = await Customer.findOne({email : email});
        if(existingCustomer) return res.status(400).json({message : "An User with the provide email Id!!"});


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

      const result = await Customer.create(newCustomer);

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
   const {email , password} = req.body;
    if(!email.includes('@') && !email.endsWith('.com')) return res.status(400).json({message : "Email invalid!!"});
    if(password.length<8) return res.status(400).json({message : "Password invalid!!"});

    const customer = await Customer.findOne({email : email});
    if(customer){
        const passwordCompare = await encryptpassword.passwordCompare(password,customer.password);
        if(passwordCompare){

            const signature = generateSignature({
                _id : customer._id,
                email : customer.email,
                verified : customer.verified
            });
            res.status(200).json({ signature : signature, email : customer.email, verified : customer.verified});

        } else {
            res.status(400).json({message : " Password do not match"});

        }
    }
    res.status(404).json({message : "login Error"});
   
}

const CustomerVerify = async(req,res)=>{
   const {otp} = req.body;
   const customer = req.user;
    if(customer) {
        const profile = await Customer.findById(customer._id);
        if(profile.otp === parseInt(otp) && profile.otp_expiry>= new Date()){
            profile.verified = true;
            const updateCustomerResponse = await profile.save();
            const signature = generateSignature({
                _id : updateCustomerResponse._id,
                email : updateCustomerResponse.email,
                verified : updateCustomerResponse.verified
            });
            return res.status(201).json({signature : signature, verified : updateCustomerResponse.verified, email : updateCustomerResponse.email });

        }
    }
    return res.status(400).json({message : "Error Otp"});
}


const RequestOtp = async(req,res)=>{
     const customer = req.user;

       if(customer){
           const profile = await Customer.findById(customer._id);
           if(profile){
               
               const  otp = await GenerateOtp();
               const expiry = await GenerateExpiry();
               profile.otp = otp;
               profile.otp_expiry = expiry;

               console.log(profile.otp);
               console.log(profile.otp_expiry);

               await profile.save();

               await onRequestOTP(otp,profile.phone);

               res.status(200).json({message : "OTP send your registred phone number"});
           }
       }

        res.status(400).json({message : "Error with Request OTP"});
}


const GetCustomerProfile = async(req,res)=>{
    const customer = req.user;
     if(customer){
         const profile = await Customer.findById(customer._id);
         if(profile) return res.status(200).json(profile);
     }
}


const EditCustomerProfile = async(req,res)=>{
    const customer = req.user;

    const {firstName, lastName, address} = req.body;
      if(firstName.length<1) return res.status(400).json({message : "FirstName invalid !!"});
      if(lastName.length<1) return res.status(400).json({message : "LastName invalid!!"});
      if(address.length<4) return res.status(400).json({message : "Address Invalid!!"});
  
       if(customer) {
           const profile = await Customer.findById(customer._id);
            if(profile){
                profile.firstName = firstName;
                profile.lastName = lastName;
                profile.address = address;
  
                const result = await profile.save();
                res.status(200).json(result);
            }
       }
}

module.exports = {
    CustomerSignUp,
    CustomerLogin,
    CustomerVerify,
    GetCustomerProfile,
    RequestOtp,
    EditCustomerProfile
}
