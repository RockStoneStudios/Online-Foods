const {Customer} = require('../controllers/index');


const router = require('express').Router();

/*--------------------- SingUp ----------------------------*/
router.post('/signup',Customer.CustomerSignUp);


/*--------------------Login-------------------------------- */
router.post('/login',Customer.CustomerLogin);
/*---------------------Verify Custommer Account------------- */
router.patch('/verify',Customer.CustomerVerify);

/*--------------------OTP----------------------*/
router.get('/otp',Customer.RequestOtp);

/*------------------- Look Profile ----------------------------------*/
router.get('/profile',Customer.GetCustomerProfile);

/*---------------------Edit Profile--------------------------------- */
router.patch('/profile',Customer.EditCustomerProfile);



module.exports = router;