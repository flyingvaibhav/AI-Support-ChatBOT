import mongoose, { model, Schema } from "mongoose";

interface IMessage {
  role: string
  text: string
  createdAt?: Date
}

interface IConversation {
  ownerId: string
  messages: IMessage[]
}

const messageSchema = new Schema<IMessage>({
  role: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

const conversationSchema = new Schema<IConversation>(
  {
    ownerId: { type: String, required: true, index: true },
    messages: { type: [messageSchema], default: [] }
  },
  { timestamps: true }
)

const Conversation = mongoose.models.Conversation || model("Conversation", conversationSchema)
export default Conversation
