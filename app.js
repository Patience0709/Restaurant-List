const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000
const restaurants = require('./public/jsons/restaurant.json').results

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword?.trim() || ''//定義undefind為空字串
  const matchedRestaurant = restaurants.filter((restaurant) => restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
  restaurant.category.toLowerCase().includes(keyword.toLowerCase())
)
  res.render('index', { restaurants: matchedRestaurant, keyword })
})

app.get('/restaurants', (req, res) => {
  res.render('index', { restaurants })
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const restaurant = restaurants.find((restaurant) => restaurant.id.toString() === id)
  res.render('detail', { restaurant })
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})