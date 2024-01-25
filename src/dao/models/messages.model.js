import mongoose from "mongoose"

const messageCollection = 'messages'

const chatSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
      },
      message: {
        type: String,
        required: true
      }
}) 

const chatModel = mongoose.model(messageCollection, chatSchema)

export default chatModel