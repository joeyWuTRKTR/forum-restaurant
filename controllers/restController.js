const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category

const restController = {
  getRestaurants: (req, res) => {
    Restaurant.findAll({ 
      raw: true,
      nest: true,
      include: [Category]
    })
      .then(restaurants => {
        restaurants.forEach(restaurant => {
          restaurant.description= restaurant.description.substring(0, 50)
          restaurant.categoryName = restaurant.Category.name
        })

        return res.render('restaurants', { restaurants })
      })
  },

  getRestaurant: (req, res) => {
    Restaurant.findByPk( req.params.id, { raw: true, nest: true ,include: [Category] } )
      .then(restaurant => {
        return res.render('restaurant', { restaurant })
      })
  }
}

module.exports = restController

// restConrtroller 是 物件
// getRestaurants 是 物件屬性
// gerRestaurants 是 函式，回傳渲染restaurants樣板