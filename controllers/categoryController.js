const db = require('../models')
const Category = db.Category

const categoryController = {
  getCategories: (req, res) => {
    Category.findAll({
      raw: true,
      nest: true,
    }).then(categories => {
      return res.render('admin/categories', { categories })
    })
  },

  postCategory: (req, res) => {
    if (!req.body.name) {
      req.flash('warning_msg', '分類名稱不存在')
      return res.redirect('back')
    }
    Category.findOne({ where: { name: req.body.name } }).then(category => {
      if (category) {
        req.flash('warning_msg', '此分類已存在!')
        return res.redirect('back')
      }
      Category.create({
        name: req.body.name,
      })
        .then(() => {
          return res.redirect('categories')
        })
    })
  }
}

module.exports = categoryController