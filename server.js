const express = require('express');
const app = express();
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
var db

MongoClient.connect('your-id-mongodb', (err, database) => {
  if (err) return console.log(err)
  db = database
})

app.set('view engine', 'ejs')
app.listen(3000, function() {
  console.log(__dirname)
})

app.get('/', (req, res) => {
  db.collection('learn').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {quotes: result})
  })
})
app.use(bodyParser.urlencoded
    (
        {extended: true}
    )
)
app.post('/quotes', (req, res) => {
   db.collection('learn').save(req.body, 
   (err, result) => {
    if (err) 
        return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})