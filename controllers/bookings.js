const Booking = require('../models/Booking');

exports.getBookings = async (req, res, next) => {
    let query;

    // Ensure that req.user is defined before checking its role
    if (req.user && req.user.role == 'user') {
        query = Booking.find({ user: req.user.id }).populate({
            path:'hotel',
            select: 'name address tel'
        });
    } else {
        // If not a user (possibly an admin), check for hotelId
        if (req.params.hotelId) {
            console.log(req.params.hotelId);
            query = Booking.find({ hotel: req.params.hotelId }).populate({
                path:'hotel',
                select: 'name address tel'
            });
        } else {
            // If no hotelId is specified, retrieve all bookings
            query = Booking.find().populate({
                path:'hotel',
                select: 'name address tel'
            });
        }
    }

    try {
        const bookings = await query;
        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Cannot find Booking"
        });
    }
};
