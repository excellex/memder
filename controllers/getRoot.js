import Meme from '../models/meme.js'
import User from '../models/user.js'
import randomMeme from '../middleware/getRandom.js'

export async function getRoot(req, res) {
  const meme = await randomMeme()
  const { url, _id } = meme

  let username
  let status = res.locals.status
  if (req.session.user) {
    username = req.session.user.username
  } else {
   res.redirect('/login')
  }
  res.render('index', { username, status, url, _id })
}

export async function login(req, res) {
  let username
  let status = res.locals.status
  if (req.session.user) {
    username = req.session.user.username
    res.redirect('/')
  } else {
    username = 'username'
  }
  res.render('login')
}

export async function register(req, res) {
  let username
  let status = res.locals.status
  if (req.session.user) {
    username = req.session.user.username
    res.redirect('/')
  } else {
    username = 'username'
  }
  res.render('register')
}


export async function add(req, res) {

  res.render('add')

}

export async function post(req, res) {
  res.render('postmeme')
}


export async function recover(req, res) {
  let username
  let status = res.locals.status
  if (req.session.user) {
    username = req.session.user.username
    res.redirect('/')

  } else {
    res.render('recover')
  }

}

export async function account(req, res) {
  const _id = req.session.user._id
  // const meme = await Meme.find().populate('votes.like')
  // const meme = await Meme.findMatches(_id)
  // for(let mem of meme){
  //   console.log(mem.votes.like);

  // }
  let username = req.session.user.username
  const user = await User.findOne({ _id })
  const userInfo = await user.getRate();
  const meme = await user.findMatches()
  const match = await User.findOne({ _id: meme })
  let status = res.locals.status
  if (res.locals.status) {
    res.render('account', { username, status, userInfo, match })
  }
  else {
    res.redirect('/')
  }
}

export async function logout(req, res) {
  if (req.session.user) {
    try {
      await req.session.destroy();
      res.clearCookie("u_sid");
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  }
  //  else {
  //   res.redirect("/");
  // }
}


export default { getRoot, recover, account, logout, login, register, add }

