export default function (req, res, next){
  if(req.session && req.session.user){
    res.locals.status = true
  } else {
    res.locals.status = false
  }
  next()
}

