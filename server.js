import http from 'http'
import connection from './middleware/dbConnect.js'
// import mongoose from 'mongoose'
import app from './app.js'
const server = http.createServer(app)

async function start() {
  try {
    await connection()
    server.listen(process.env.PORT, () => {
      console.log('the server has been started at port:', process.env.PORT)
    })
  }
  catch (error) {
    console.log('error');
    console.log(error);
  }
}

start()

