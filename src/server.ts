import express from 'express'
import router from "./router"
const app = express()
import path from 'path'
import morgan from 'morgan'
import cors from 'cors'
import { protect } from "./modules/auth"
import {createNewUser, signin} from "./handler/user"

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


/*
app.use((req, res, next) => {
  req.shh_secret = 'doggy'
  next()
})
*/


app.use(express.static('static'))

app.get('/', (req, res, next) => {
  setTimeout(() => {
    next(Error('not implemented'))
  }, 1000)
  // res.sendFile(path.resolve('src/pages/index.html'))
})


app.use('/api', protect, router)
app.post('/user', createNewUser)
app.post('/signin', signin)

app.use((err, req, res, next) => {
  if (err.type === 'auth') {
    res.status(401).json({message: 'unauthorized'})
  } else if (err.type === 'input') {
    res.status(400).json({message: 'invalid input'})
  } else {
    res.status(500).json({message: 'oops that\'s on us' })
  }
})

export default app
