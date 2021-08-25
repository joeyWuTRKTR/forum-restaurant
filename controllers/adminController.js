const db = require('../models')
const Restaurant = db.Restaurant

const adminController = {
  getRestaurants: (req, res) => {
    // 自動導到views文件夾，找到admin文件的restaurants.handlebars
    Restaurant.findAll({ raw: true, nest: true }).then(restaurants => {
      return res.render('admin/restaurants', restaurants)
    })
  }
}

module.exports = adminController