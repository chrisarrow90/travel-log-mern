import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import postRoutes from './routes/posts.js'

const app = express()

// Middleware
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

// Routes
app.use('/posts', postRoutes)

// Only required for heroku deployment
app.get('/', (req, res) => {
  res.send('Hello to memories api')
})

// Server and DB Connection
const PORT = process.env.PORT || 5000

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
      console.log('Server running on port: ', PORT)
    })
  })
  .catch((error) => {
    console.error(error.message)
  })
