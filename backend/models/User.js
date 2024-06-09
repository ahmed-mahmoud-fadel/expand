const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    isVerified: {type: Boolean, default: false},
    verificationToken: String,
    username: { type: String, required: true, unique: true },
    passwordHash: {type: String, required: true},
    role: {type: String, enum: ['user', 'admin'], default: 'user'},
    phone:  String,
    gender: { type: String, enum: ['M', 'F', 'Other'] },
    country: String,
    city: String,
    street: String,
    zip: Number,
    photo: String,
    status: { type: String, enum: ['Active', 'Pending'], default: 'Pending'},
    companyName: { type: String, required: true},
    companyLocation: String,
    companyWebsite: String,
}, { timestamps: true });
userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
module.exports = mongoose.model('User', userSchema);