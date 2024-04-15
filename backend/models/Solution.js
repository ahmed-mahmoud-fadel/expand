const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const solutionSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    thumbnail: string,
    modelUsed: String,
    algorithm: String,
    tags: String,
    active: { type: Boolean, default: false }
  }, { timestamps: true });

module.exports = mongoose.model('Solution', solutionSchema);
