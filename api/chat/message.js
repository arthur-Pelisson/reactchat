const mongoose = require('mongoose');
module.exports = mongoose.model('message', { message: String });
