const mongoose = require ('mongoose');

const HotelSchema = new mongoose.Schema({
    name : {
        type : String,
        unique : true,
        trim : true,
        require : [true , 'Please add a name']
    },
    address : {
        type : String,
        unique : true,
        required : [true , 'Please add an address'],
    },
    tel : {
        type : String,
        unique : true,
        require : [true , "Please add a Hotel's telephone Number"]
    }

});

module.exports = mongoose.model('Hotel',HotelSchema)