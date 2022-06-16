import express from 'express'
import * as diaryServices from '../services/diaryServices'
import toNewDiaryEntry from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
    res.send(diaryServices.getEntriesWithoutSensitiveInfo())
})

router.get('/:id', (req, res) => {
    const diary = diaryServices.findById(+req.params.id)

    return (diary != null)
        ? res.send(diary)
        : res.sendStatus(404)
})



router.post('/', (req, res) => {
    try {
        // const { date, weather, visibility, comment } = req.body;
        const newDiaryEntry= toNewDiaryEntry(req.body)
        const addediaryEntry = diaryServices.addEntry(newDiaryEntry)
        res.json(addediaryEntry)
    } catch (err) {
        res.status(400).send("falló")
    }

})

export default router;