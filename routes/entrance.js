import express from 'express'
import * as controller from '../controllers/postReg.js'
import isLogin from '../middleware/isLogin.js'
const router = express.Router()
export default router

router.post('/registration',  controller.reg)
router.post('/login', controller.log)
router.post('/recovering', controller.rec)

