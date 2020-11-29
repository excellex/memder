import mongoose from 'mongoose'
const Schema = mongoose.Schema


const memeSchema = new Schema({
  url: { type: String, required: true, unique: true },
  description: [{ type: String }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  votes: {
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    dislike: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    supelike: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    trash: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  }
})

// memeSchema.statics.findMatches = async function()  {
//   const liked = await this.find().populate('votes.like')
//   return liked
// } 

export const Meme = mongoose.model('Meme', memeSchema)

export default Meme


