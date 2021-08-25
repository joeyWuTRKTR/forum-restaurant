const passport = require('./config/passport')
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')

// 產生flash並放到session
const flash = require('connect-flash')
const session = require('express-session')

const db = require('./models')
const app = express()
const port = 3000

app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(session({ secret:'secret', resave: false, saveUninitialized: false }))
app.use(flash())
app.use(bodyParser.urlencoded({ extended: true }))

// 使用passport
app.use(passport.initialize()) // 初始化
app.use(passport.session()) // 資料存放在session

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.listen(port, () => {
  db.sequelize.sync()
  console.log(`Example app listening at http://localhost:${port}`)
})

// 把express() & passport 回傳給routes
require('./routes')(app, passport)

module.exports = app