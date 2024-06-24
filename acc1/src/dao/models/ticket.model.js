const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  code: {
    type: String,
    unique: true,
    required: true 
  },
  purchase_datetime: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    required: true
  },
  purchaser: {
    type: String,
    required: true
  }
});

module.exports.ticketSchema =  mongoose.model('Ticket', ticketSchema);;
