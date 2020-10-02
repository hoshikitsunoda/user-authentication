import express, { Application, Response } from 'express'
import expressjwt from 'express-jwt'

import cors from 'cors'
import dotenv from 'dotenv'

const app: Application = express()
dotenv.config()

const PORT: string | number = process.env.API_PORT || 8000

app.use(express.json())
app.use(cors())

const jwtCheck = expressjwt({
  secret: process.env.KEY as string,
  algorithms: [process.env.ALGORITHM],
})

app.get('/user', (_, res: Response) => {
  res.status(200).send(`Anyone can see this`)
})

app.get('/user/loggedin', jwtCheck, (_, res: Response) => {
  res.status(200).send(`Only the logged in users can see this message`)
})

app.get('*', (_, res: Response) => res.sendStatus(404))

app.listen(PORT, () => console.log(`listening on Port ${PORT}`))
