import express, { Application, Response } from 'express'
import dotenv from 'dotenv'

const app: Application = express()
dotenv.config()

const PORT = process.env.PORT || 8000

app.get('*', (_, res: Response) => res.sendStatus(404))

app.listen(PORT, () => console.log(`listening on Port ${PORT}`))
