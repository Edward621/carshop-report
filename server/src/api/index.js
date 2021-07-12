const router = require('express').Router();
const cars = require('./cars/router');

router.use('/cars', cars);

module.exports = router;
