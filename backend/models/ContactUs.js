const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactUsSchema = new Schema({
    name: String,
    email: String,
    message: String,
}, { timestamps: true });

contactUsSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
module.exports = mongoose.model('ContactUs', contactUsSchema);