const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User

const userController = {
  // 渲染 signup 畫面
  signUpPage: (req, res) => {
    return res.render('signup')
  },
  // 處理註冊行為
  signUp: (req, res) => {
    const { name, email, password, passwordCheck } = req.body
    // 確認密碼和密碼不同
    if ( password !== passwordCheck) {
      req.flash('warning_msg', '密碼和密碼確認不相符!')
      return res.redirect('/signup')
    }

    User.findOne({ where: {email: email} }).then(user => {
      if (user) {
        req.flash('warning_msg', '此信箱已註冊!')
        return res.redirect('/signup')
      } else {
        User.create({
          name: req.body.name,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
        }).then(user => {
          // 註冊成功
          req.flash('success_msg', '註冊成功!')
          return res.redirect('/signin')
        })
      }
    })
  }
}

module.exports = userController