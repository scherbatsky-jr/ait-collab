const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    users: Array,
    messages: Array,
})

module.exports = mongoose.model('Chat', chatSchema);
