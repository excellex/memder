import User from '../models/user.js'
import bcrypt from 'bcrypt'
import passport from 'passport'
import jwt from 'jsonwebtoken'

export async function reg(req, res) {
  const { username, email, password } = req.body
  const salt = bcrypt.genSaltSync(2)
  console.log('register is going');
  const hashPass = bcrypt.hashSync(password, salt)

  const user = new User({
    username,
    email,
    password: hashPass
  })

  await user.save(err => {
    if (err) {
      console.log(err)
      const message = `a user is NOT created...\n${err}`
      res.status(404).json({
        success: false,
        message
      })
    } else {
      // req.session.user = user  // ЛОГИНИМСЯ СРАЗУ
      res.status(201).json({
        success: true,
        message: 'a user is created'
      })
    }
  })
}

export async function rec(req, res) {
  const { email } = req.body
  const user = await User.findOne({ email })

  if (user) {
    res.status(200).json({
      success: true,
      message: 'a password is repaired'
    })
  } else {
    res.status(404).json({
      success: false,
      message: 'not found'
    })
  }
}

export async function log(req, res) {
  // const { login, password } = req.body
  // User.getUserByLogin(login, (err, user) => {
  //   if (err) {
  //     throw err
  //   }
  //   if (!user) {
  //     return res.json({ success: false, message: `the user isn't found` })
  //   }

  //   User.comparePass(password, user.password, (err, isMatch) => {
  //     if (err) {
  //       throw err
  //     }
  //     if (isMatch) {
  //       const token = jwt.sign(user, process.env.SECRET, {
  //         expiresIn: 3600 * 24
  //       })
  //       res.json({
  //         success: true,
  //         token: 'JWT' + token,
  //         user: {
  //           _id,
  //           login,
  //           name,
  //           email
  //         }
  //       })
  //     } else {
  //       return res.json({ success: false, message: `the password isn't correct` })
  //     }
  //   })
  // })

  const { username, password } = req.body
  const user = await User.findOne({ username })
  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      console.log(`the user is found and the password is correct`)
      req.session.user = user
      res.status(201).json({
        success: true,
        message: 'a user is logged'
      })
    } else {
      console.log(`the user is found but the password isn't correct`)
      const message = `the password isn't correct`
      res.status(404).json({
        success: false,
        message
      })
    }
  } else {
    console.log(`the user isn't found`)
    const message = `the user isn't found`
    res.status(404).json({
      success: false,
      message
    })
  }
}



export default { reg, log }

