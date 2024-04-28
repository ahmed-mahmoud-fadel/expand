const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pricingPlansSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    pricing: Number,
    sale: Number,
  });

module.exports = mongoose.model('pricingPlans', pricingPlansSchema);
