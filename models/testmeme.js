import mongoose from 'mongoose'
const Schema = mongoose.Schema

const testmemeSchema = new Schema({
  url: { type: String,  unique: true },
  data: Buffer,
  description: [{ type: String }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  votes: {
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    dislike: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    supelike: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    trash: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  }
})

export const Testmeme = mongoose.model('Testmeme', testmemeSchema)

export default Testmeme


