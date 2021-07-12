const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var carSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'sold out'],
    default: 'available',
    required : true
  },
  soldAt: Date
});

module.exports = mongoose.model('car', carSchema);
