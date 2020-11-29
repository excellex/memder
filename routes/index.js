import express from 'express'
import * as controller from '../controllers/getRoot.js'
import isLogin from '../middleware/isLogin.js'
const router = express.Router()
export default router
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pass from '../middleware/passport.js'
pass(passport)

import passport from 'passport'
import passportLocal from 'passport-local'
const LocalStrategy = passportLocal.Strategy

// router.get('/', passport.authenticate('jwt', {session: false}), controller.getRoot)
router.get('/', isLogin, controller.getRoot)
router.get('/add',  isLogin, controller.add)
router.get('/post',  isLogin, controller.post)
router.get('/login', isLogin, controller.login)
router.get('/register', isLogin, controller.register)
router.get('/logout', isLogin, controller.logout)
router.get('/account', isLogin, controller.account)
router.get('/recover', isLogin, controller.recover)

