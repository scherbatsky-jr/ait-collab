const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    name: String,
    code: String,
    departments: Array
});

module.exports = mongoose.model('School', schoolSchema);
