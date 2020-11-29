import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()

export function connection(){
  mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

export default connection
