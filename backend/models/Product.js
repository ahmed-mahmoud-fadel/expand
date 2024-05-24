const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    thumbnail: String,
    model: String,
    status:  { type: String, enum: ['active', 'pending'], default: 'pending' },
    category: String,
    vendor: String,
    link: String
}, { timestamps: true });

productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
module.exports = mongoose.model('Product', productSchema);