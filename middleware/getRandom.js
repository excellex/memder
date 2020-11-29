import connection from './dbConnect.js'
import Meme from '../models/meme.js'

export async function randomMeme(){
  const randommeme = await Meme.findOne().skip(Math.floor(Math.random() * (await Meme.countDocuments())))
  if(randommeme){
    const  {url, _id } =  randommeme
    const meme = { url, _id }
    return meme
  } else return {   url: 'https://www.gits.lu/wp-content/uploads/2016/04/disaster_recovery-2.png',
  _id: 'none'}

}

export default randomMeme
