const router = require('express').Router();
const {login,getVandorProfile,updateVandorProfile,updateVandorService,addFood,getFoods} = require('../controllers/VandorControllers');
const authenticate = require('../middlewares/authenticate');

router.post('/login',login);
router.get('/profile',authenticate,getVandorProfile);
router.patch('/profile',authenticate,updateVandorProfile);
router.patch('/services',authenticate,updateVandorService);

router.post('/food',authenticate,addFood);
router.get('/foods',authenticate,getFoods);

router.get('/',(req,res)=>{
     res.json('Hello Vandor');
});


module.exports = router;