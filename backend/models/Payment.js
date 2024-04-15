const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const paymentSchema = new Schema({
    invoice: { type: Schema.Types.ObjectId, ref: 'Invoice' },
    methodOfPayment: String,
    amount: Number,
    currency: String,
    date: Date,
    status: String,
    errorDescription: String
});
module.exports = mongoose.model('Payment', paymentSchema);