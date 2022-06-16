import express from 'express'
import diaryRouter from './routes/diaries'

const app = express()
const port = 3000
app.use(express.json())

app.get('/ping', (_req, res) => res.send('Hello World!'+ new Date().toLocaleDateString()

))
app.use('/api',diaryRouter)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))