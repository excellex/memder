import express from 'express'
import session from 'express-session'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import store from 'connect-mongo'
import multer from 'multer'
import pass from './passport.js'
// import connection from './dbConnect.js'
const MongoStore = store(session)


import path from 'path'
import User from '../models/user.js'
const __dirname = path.resolve()

export function settings(app) {

  app.use(passport.initialize())
  app.use(passport.session())
  // pass(passport)

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  app.set('view engine', 'hbs')
  app.set('views', path.join(__dirname, 'views'))
  app.use(express.static(path.join(__dirname, 'public')))
  app.use(multer({ dest: "uploads" }).single("filedata"))
  app.use(cookieParser())
  app.use(bodyParser.json())
  app.use(session({
    name: 'u-sid',
    resave: false,
    saveUninitialized: true,
    secret: ' ',
    // store: new MongoStore(),
    store: new MongoStore({
      // host: '127.0.0.1',
      // port: '27017',
      db: 'session',
      url: process.env.DB
    }),
    cookie: {
      maxAge: 1000 * 3600 * 24 * 7,
      httpOnly: true
    }
  }))
}


export default settings
