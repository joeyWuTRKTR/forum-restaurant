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
          name: name,
          email: email,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
        }).then(user => {
          // 註冊成功
          req.flash('success_msg', '註冊成功!')
          return res.redirect('/signin')
        })
      }
    })
  },

  // signInPage
  signInPage: (req, res) => {
    res.render('signin')
  },
  // signIn
  signIn: (req, res) => {
    req.flash('success_msg', '成功登入!')
    return res.redirect('/restaurants')
  },
  // logOut
  logOut: (req, res) => {
    req.flash('success_msg', '成功登出!')
    req.logout()
    return res.redirect('/signin')
  }, 

  // profile page
  getUser: (req, res) => {
    return User.findByPk(req.params.id)
      .then(user => {
        return res.render('profile', { user: user.toJSON() } )
      })
  },

  // profile edit page
  editUser: (req, res) => {
    return User.findByPk(req.params.id)
      .then(user => {
        return res.render('profileEdit', { user: user.toJSON() })
      })
  }, 

  // profile update page
  putUser: (req, res) => {
    return User.findByPk(req.params.id)
      .then(user => {
        user.update({
          name: req.body.name
        })
          .then(() => {
            return res.redirect(`/users/${req.params.id}`)
          })
      })
  }
}

module.exports = userController