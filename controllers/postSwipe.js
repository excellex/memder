import Meme from '../models/meme.js'
import User from '../models/user.js'


export async function swipe(req, res) {
  const id = req.session.user._id
  const user = await User.findOne({ _id: id })
  const { act, _id } = req.body
  const meme = await Meme.findOne({ _id })
  meme.votes[act].push(req.session.user._id)
  user.votes[act].push(_id)
  await meme.save()
  await user.save()

  res.status(200).json({
    success: true,
    message: 'OK'
  })
}


export async function meme(req, res) {
  const { url } = req.body
  const author = req.session.user._id
  const meme = new Meme({
    url,
    author
  })

  await meme.save(err => {
    if (err) {
      console.log(err)
      const message = `a meme is NOT posted...\n${err}`
      res.status(404).json({
        success: false,
        message
      })
    } else {
      res.status(201).json({
        success: true,
        message: 'a meme is posted!'
      })
    }
  })


}

export default { swipe, meme }


