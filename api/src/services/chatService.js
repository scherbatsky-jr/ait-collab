const Chat = require('../models/chat');

const getChatIds = async (userId) => {
    try {
        const chats = await Chat.find({ users: userId})

        return chats.map(chat => chat._id)
    } catch (err) {
        throw err
    }
}

const getChatMessages = async (chatId) => {
    try {
        const chat = await Chat.findById(chatId)

        return chat.messages;
    } catch (err) {
        throw err
    }
}

const addMessage = async (data) => {
    try {
        return Chat.findByIdAndUpdate(data.chatId, {
            $push: {
                messages: {
                    userId: data.userId,
                    text: data.text,
                    createdAt: Date.now()
                }
            },
        },
        {
            new: true
        }).exec()
    } catch (err) {
        throw err
    }
}

module.exports = {
    addMessage,
    getChatIds,
    getChatMessages
}
