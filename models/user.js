import Meme from '../models/meme.js'
import mongoose from 'mongoose'
const Schema = mongoose.Schema
import bcrypt from 'bcrypt'

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  votes: {
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meme' }],
    dislike: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meme' }],
    supelike: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meme' }],
    trash: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meme' }],
  }
})

userSchema.statics.getUserByLogin = (login, cb) => {
  const query = { login }
  User.findOne(query, cb)
}

userSchema.statics.comparePass = ((userPass, userDBpass, cb) => {
  bcrypt.compare(userPass, userDBpass, (err, isMatch) => {
    if(err){
      throw err
    }
    cb(null, isMatch)
  })
})

userSchema.methods.getRate = async function () {
  let rate = 0
  let likes = 0
  let dislikes = 0
  let progress = 0

  const memes = await Meme.find({ author: this.id }).populate('like')
  progress = memes.length
  for (const mem in memes) {
    rate += Math.round(1 * (1 + memes[mem].votes.like.length) / (1 + memes[mem].votes.dislike.length / 3))
    likes += memes[mem].votes.like.length
    dislikes += memes[mem].votes.dislike.length
  }
  const info = { rate, likes, dislikes, progress }
  return info
}


userSchema.methods.findMatches = async function () {
  const likes = this.votes.like
  const thisId = this._id
  let arr = []
  for (let _id of likes) {
    const meme = await Meme.findOne({ _id }).populate('votes.like')
    const colleagues = meme.votes.like
    for (let col of colleagues) {
      if (col._id.toString() != thisId.toString()) {
        arr.push(col._id)
      }
    }
  }

  return match(arr)
}

function match(array) {
  let match;
  let currentNumber;
  let lastNumber;
  let currentCount;
  let lastCount;
  array.sort();
  let y = 1;
  let tempArr = [];
  for (let x = 0; x < array.length; x++) {
    if (array[x] == array[y]) {
      tempArr.push(array[x]);
      currentNumber = array[x];
    }
    else {
      tempArr.push(array[x]);
      currentNumber = array[x];
      currentCount = tempArr.length;
      tempArr = [];
      if (lastCount >= currentCount) {
        match = lastNumber;
      }
      else {
        match = currentNumber
      }
      lastCount = currentCount;
      lastNumber = currentNumber;
    }

    y++;

  }
  return match
}



export const User = mongoose.model('User', userSchema)

export default User
