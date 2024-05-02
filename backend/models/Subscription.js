const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const subscriptionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  solution: { type: Schema.Types.ObjectId, ref: 'Solution', required: true },
  pricingPlans: { type: Schema.Types.ObjectId, ref: 'pricingPlans', required: true },
  startDate: { type: Date },
  endDate: Date,
  autoRenew: { type: Boolean, default: false },
  status: { type: String, enum: ['active', 'pending', 'canceled', 'paused', 'expired'], default: 'pending' },

  }, { timestamps: true });

subscriptionSchema.virtual('isSubscriptionActive').get(function () {
  const now = new Date();
  return this.autoRenew || this.endDate > now;
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
