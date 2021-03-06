require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const usersRouter = require('./app/routes/users.routes.js')
app.use('/users', usersRouter)
const productsRouter = require('./app/routes/blogs.routes.js')
app.use('/blogs', blogsRouter)


app.listen(process.env.PORT || 4000, () => console.log('Server Started'))