const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
    subscription: { type: Schema.Types.ObjectId, ref: 'Subscription' },
    totalAmount: Number,
    currency: String,
    dueDate: Date,
    paid: { type: Boolean, default: false },
    paymentDate: Date,
    created_at: { type: Date, default: Date.now }
  });

module.exports = mongoose.model('Invoice', invoiceSchema);
