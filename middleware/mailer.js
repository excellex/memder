import sndmail from 'sendmail'
const sendmail = sndmail()

sendmail({
  from: 'no-reply@yourdomain.com',
  to: 'test@qq.com, test@sohu.com, test@163.com ',
  subject: 'test sendmail',
  html: 'Mail of test sendmail ',
}, function (err, reply) { });


// import mail from 'mail'

// mail.Mail({
//   host: 'smtp.mail.ru',
//   username: 'excellex@mail.ru',
//   password: 'vtyznmBdctnen'
// });
// mail.message({
//   from: 'excellex@mail.ru',
//   to: ['mail@llixrijb.com'],
//   subject: 'Hello from Node.JS'
// })
//   .body('Node speaks SMTP!')
//   .send(function (err) { });
