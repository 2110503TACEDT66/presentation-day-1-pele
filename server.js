const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');


dotenv.config({path :'./config/config.env'});

const app = express();
app.use(express.json());

const hotels = require('./routes/hotels');
const auth = require('./routes/auth');
const bookings = require('./routes/bookings');

app.use('/api/v1/hotels',hotels);
app.use('/api/v1/auth',auth);
app.use('/api/v1/bookings',bookings);
app.use(cookieParser());

connectDB();

const PORT = process.env.PORT || 5000 ;
const server = app.listen(PORT,console.log('Server running in' , process.env.NODE_ENV,'mode on port ', PORT));

process.on('unhandledRejection',(err,promise) => {
    console.log(`Error : ${err.message}`);
    server.close(()=> process.exit(1));
})
