const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    users: Array,
    chats: Array,
})

module.exports = mongoose.model('Chat', chatSchema);
