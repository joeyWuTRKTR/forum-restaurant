const adminController = {
  getRestaurants: (req, res) => {
    // 自動導到views文件夾，找到admin文件的restaurants.handlebars
    return res.render('admin/restaurants')
  }
}

module.exports = adminController