const restController = {
  getRestaurants: (req, res) => {
    return res.render('restaurants')
  }
}

module.exports = restController

// restConrtroller 是 物件
// getRestaurants 是 物件屬性
// gerRestaurants 是 函式，回傳渲染restaurants樣板