require('dotenv').config()
const mongoose = require('mongoose');
const connect = async () => {
   try {
      await mongoose.connect(process.env.DB_MONGO);
      console.log('connect successfully')
   } catch (error) {
        console.log('connect failure!' + error)
   }
};

module.exports = { connect };