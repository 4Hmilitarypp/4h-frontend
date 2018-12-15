const express = require('express')
const helmet = require('helmet')
const path = require('path')
const dotenv = require('dotenv')

const app = express()
dotenv.config()
app.use(helmet())

app.use(express.static(path.resolve(__dirname, './build'), { maxAge: '30d' }))
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './build/index.html'), err => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.set('port', process.env.PORT || 5000)
const server = app.listen(process.env.PORT, () => {
  console.log(`Express running → PORT ${server.address().port}`)
})
