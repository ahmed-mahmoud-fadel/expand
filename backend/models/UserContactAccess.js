const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userContactAccessSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    contact: { type: Schema.Types.ObjectId, ref: 'ContactUs' }
});

module.exports = mongoose.model('UserContactAccess', userContactAccessSchema);