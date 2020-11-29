import express from 'express'

const app = express()
export default app
import  middleware from './middleware/index.js'
middleware(app)

import indexrouter from './routes/index.js'
import authrouter from './routes/entrance.js'
import apirouter from './routes/api.js'

app.use('/', indexrouter)
app.use('/api/auth', authrouter)
app.use('/api', apirouter)


