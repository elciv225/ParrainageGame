
const express = require('express')
const app = express()
const port = 3000


app.set('view engine', 'ejs');
app.set('views', './views')
app.use(express.static('public'));
app.use(express.static('media'));

app.get('/', (req, res) => {
  res.render('home', { title: 'Hey', message: 'Hello there!'});
})

app.get('/result', function (req, res) {
  res.render('result', { title: 'Hey', message: 'Hello there!'});
});

app.get('/game', function (req, res) {
  res.render('game', { title: 'Hey', message: 'Hello there!'});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})