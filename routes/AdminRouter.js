const router = require('express').Router();

const {AdminController} = require('../controllers/index');

router.post('/vandor',AdminController.createVandor);
router.get('/vandors',AdminController.getVandors);
router.get('/vandor/:id',AdminController.getVandorById);

module.exports = router;