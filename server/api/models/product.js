var mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  full_name: {
    type: String,
    Required: 'Enter first name'
  },
  checkout: {
      type: String,
      Required: 'Enter checkout'
  },
  people: {
      type: Number,
      Required: 'Enter people'
  },
  kids: {
    type: Number,
    Required: 'Enter kids'
},
 room_type: {
    type: String,
    Required: 'Enter room type'
},
   room_number: {
    type: Number,
    Required: 'Enter room Number'
},
address: {
  type: String,
  Required: 'Enter Location'
},
  Created_date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Product',productSchema);