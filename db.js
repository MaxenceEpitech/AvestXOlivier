const mongoose = require('mongoose');

module.exports = () => {
    const connectMongoose = async () => {
        try {
            const mongooseConnection = await mongoose.connect(process.env.MONGODB_URL, {
                socketTimeoutMS: 30000,
            });
            console.log('Mongoose connected to', mongooseConnection.connection.host);
        } catch (error) {
            console.log('Mongoose connection error:', error);
        }
    };

    connectMongoose();
};
