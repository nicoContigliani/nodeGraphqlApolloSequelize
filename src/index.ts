import express from 'express'
import User from '../models/user.model';
import sequelize from '../config/database';


async function syncModels() {
    await User.sync();
}

syncModels();
export { sequelize, User };




const app = express()
const port = 3000
app.use(express.json())

app.get('/ping', (_req, res) => res.send('Hello World!' + new Date().toLocaleDateString()

))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))