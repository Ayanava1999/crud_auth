const mongoose = require("mongoose");

const dotenv = require('dotenv');
dotenv.config();

connectionUrl=process.env.URLMONGODB,

mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.once('open', () => {
    console.log('MongoDB is Open');
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

module.exports=db