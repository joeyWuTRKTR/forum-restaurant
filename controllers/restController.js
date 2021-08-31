const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category

const restController = {
  getRestaurants: async (req, res) => {
    const whereQuery = {}
    let categoryId = ''
    if (req.query.categoryId) {
      categoryId = Number(req.query.categoryId)
      whereQuery.CategoryId = categoryId
    }

    await Restaurant.findAll({ 
      raw: true,
      nest: true,
      include: [Category],
      where: whereQuery // 篩選條件
    })
      .then(restaurants => {
        restaurants.forEach(restaurant => {
          restaurant.description= restaurant.description.substring(0, 50)
          restaurant.categoryName = restaurant.Category.name
        })
        Category.findAll({
          raw: true,
          nest: true
        })
          .then(categories => {
            return res.render('restaurants', { restaurants, categories, categoryId })
          })
      })
  },

  getRestaurant: (req, res) => {
    Restaurant.findByPk( req.params.id, { raw: true, nest: true, include: [Category] } )
      .then(restaurant => {
        return res.render('restaurant', { restaurant })
      })
  }
}

module.exports = restController

// restConrtroller 是 物件
// getRestaurants 是 物件屬性
// gerRestaurants 是 函式，回傳渲染restaurants樣板