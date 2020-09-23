import express, { Application, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import cors from 'cors'
import dotenv from 'dotenv'

import { users } from './constant/data'

const app: Application = express()
dotenv.config()

const PORT: string | number = process.env.PORT || 8000

app.use(express.json())
app.use(cors())

app.post('/login', (req: Request, res: Response) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send(`You need username and password`)
    return
  }

  const user = users.find(
    (user) =>
      user.username === req.body.username && user.password === req.body.password
  )

  if (!user) {
    res.status(401).send(`User not found`)
    return
  }

  const token = jwt.sign(
    {
      sub: user.id,
      username: user.username,
    },
    'secretkey',
    { expiresIn: '3 hours' }
  )

  res.status(200).send({ access_token: token })
})

app.get('*', (_, res: Response) => res.sendStatus(404))

app.listen(PORT, () => console.log(`listening on Port ${PORT}`))
