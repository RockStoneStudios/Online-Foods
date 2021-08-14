const {findVandor} = require('./AdminControllers');
const {passwordCompare,generateSignature} = require('../utility/encryptPassword');
const Food = require('../models/index')
const login = async(req,res)=>{
    const{ email, password} = req.body;

    const vandor = await findVandor('',email);
   
    if(vandor) {
        const confirmPassword = await passwordCompare(password,vandor.password);
        if(confirmPassword){
             const signature =  generateSignature({
                 _id : vandor._id,
                 email : vandor.email,
                 foodType : vandor.foodType,
                 name : vandor.name
             });
                 
             
            res.json(signature);
        } else {
            res.json({message : "password is not Valid!!"});
        }
    } else {
        res.json({message : "Login Credential not Valid!!"});
    }
}

const getVandorProfile = async(req,res)=>{
    const user = req.user;
    console.log(user);
     if(user){
         const existingVandor = await findVandor(user._id);
         console.log(existingVandor);
         res.json(existingVandor);
     }
     res.json({messsage : "Vandor Info not Found"});
}

const updateVandorProfile = async(req,res)=>{
  const {foodType,name,address,phone} = req.body;
  const user = req.user;
   if(user) {
       const existingVandor = await findVandor(user._id);
        if(existingVandor){
            existingVandor.foodType = foodType;
            existingVandor.name = name;
            existingVandor.address = address;
            existingVandor.phone = phone;

           const saveResult =  await existingVandor.save();
           res.json(saveResult);

        }
   }
}

const updateVandorService = async(req,res)=>{
     const user = req.user;
     if(user) {
         const existingVandor = await findVandor(user._id);
         if(existingVandor){
             existingVandor.serviceAvailable = !existingVandor.serviceAvailable;
            const result =  await existingVandor.save();
            res.json(result);
             
         }
     }
}

const updateVandorCoverImage = async(req,res)=>{
    const user = req.user;
    if(user) {
        const vandor = await findVandor(user._id);
         if(vandor){
             const files = req.files;
             const images = files.map(file => file.filename);
             vandor.coverImages.push(...images);
             const result = await vandor.save();
             res.json(result);
         }

    }
}

const addFood = async(req,res)=>{
  const user = req.user;
   if(user) {
       const {name,description,category,foodType,readyTime,price} = req.body;
       console.log(req.body);
       const vandor = await findVandor(user._id);
       console.log(vandor);
        if(vandor){

              const files = req.files;
              console.log(files);
               const images = files.map(file => file.filename);
                const createFood = await Food.food.create({
                vandorId : user._id,
                name : name,
                description :description,
                category : category,
                foodType : foodType,
                images : images,
                readyTime : readyTime,
                price : price,
                rating : 0
            });
            vandor.foods.push(createFood);
            const result = await vandor.save();
            return  res.json(result);
        } else {
            res.json({message : "Not Vandor with Id"});
        }
         
   }
}

const getFoods = async(req,res)=>{
   const user = req.user;
    if(user) {
        const foods = await Food.food.find({vandorId : user._id});
        res.json(foods);
    }else {
      res.json({message : "Foods Info not Found"});
    }
}

module.exports = {
    login,
    getVandorProfile,
    updateVandorProfile,
    updateVandorService,
    addFood,
    getFoods,
    updateVandorCoverImage
}