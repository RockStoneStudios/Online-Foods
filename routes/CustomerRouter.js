const {Customer} = require('../controllers/index');
const authenticated = require('../middlewares/authenticate');

const router = require('express').Router();

/*--------------------- SingUp ----------------------------*/
router.post('/signup',Customer.CustomerSignUp);


/*--------------------Login-------------------------------- */
router.post('/login',Customer.CustomerLogin);


/*---------------------Verify Custommer Account------------- */
router.patch('/verify',authenticated,Customer.CustomerVerify);

/*--------------------OTP----------------------*/
router.get('/otp',authenticated,Customer.RequestOtp);

/*------------------- Look Profile ----------------------------------*/
router.get('/profile',authenticated,Customer.GetCustomerProfile);

/*---------------------Edit Profile--------------------------------- */
router.patch('/profile',authenticated, Customer.EditCustomerProfile);



module.exports = router;