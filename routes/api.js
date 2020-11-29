import express from 'express'
import * as controller from '../controllers/postSwipe.js'
import isLogin from '../middleware/isLogin.js'
const router = express.Router()
export default router


router.post('/swipe',  controller.swipe)
router.post('/postmeme', controller.meme)
