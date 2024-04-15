const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenRevocationSchema = new Schema({
  jti: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true }
});

module.exports = mongoose.model('TokenRevocation', tokenRevocationSchema);
