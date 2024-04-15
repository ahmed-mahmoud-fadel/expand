const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactUsSchema = new Schema({
    name: String,
    email: String,
    message: String,
}, { timestamps: true });
module.exports = mongoose.model('ContactUs', contactUsSchema);