const express = require('express');
const {getBookings} = require('../controllers/bookings');

const router = express.Router({ mergeParams:true});

const {protect} =require('../middleware/auth');

router.route('/').get(getBookings);

module.exports = router;