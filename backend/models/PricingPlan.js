const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pricingPlanSchema = new Schema({
    Title: { type: String, required: true },
    description: String,
    pricing: Number,
    sale: Number,
  });

module.exports = mongoose.model('pricingPlan', pricingPlanSchema);
