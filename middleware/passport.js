
import jwt, { ExtractJwt } from 'passport-jwt'
import passportLocal from 'passport-local'
import connection from './dbConnect.js'
import User from '../models/user.js'
import passport from 'passport'




export async function pass(passport) {
  const JwtStrategy = jwt.Strategy
  const extractJwt = jwt.ExtractJwt

  const opts = {}

  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  opts.secretOrKey = process.env.SECRET

  // opts.issuer = 'example.com' // пока непонятные
  // opts.audience = 'yoursite.com' // параметры

  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({_id: jwt_payload.sub}, (err, user) =>{
      if(err){
        return done(err, false)
      }
      if(user){
        return done(null, user)
      } else{
        return done(null, false)
      }
    })
  }))

}

export default pass
