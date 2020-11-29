import mongoose from 'mongoose'
const Schema = mongoose.Schema


const recoverSchema = new Schema({
  username: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  secret: { type: String }
})

export const Recover = mongoose.model('Recover', recoverSchema)

export default Recover
