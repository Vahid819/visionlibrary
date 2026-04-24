import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    sender: [
        {
            type: String,
        }
    ]
})

export const Message = mongoose.models.Message || mongoose.model("Message", MessageSchema);