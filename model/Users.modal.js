const mongoose = require('mongoose');
const { Schema } = mongoose;

const Users = new Schema({
    _id: {type: String},
   ip: { type: String },
   userAgent: { type: String },
   internet: {type: Object},
   createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Users', Users);
