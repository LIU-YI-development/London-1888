import { Router } from 'express'
import { VictimExistsError } from '../errors'
import London from '../models/london'

const router = Router()

router.post('/victim/:name/:posX/:posY', async (req, res) => {
    const { name, posX, posY } = req.params
    try {
        if (parseInt(posX) && parseInt(posY) && name) {
            const getLondon = new London()
            const createdElements = await getLondon.addVictim(
                name,
                parseInt(posX),
                parseInt(posY)
            )
            res.status(200)
                .set({ 'Content-Type': 'application/json' })
                .json(createdElements)
        }

        res.status(400).end()
    } catch (err) {
        if (err instanceof VictimExistsError) {
            res.status(409)
                .send('there is already a victim in the database')
                .end()
        } else {
            console.error(err)
            throw err
        }
    }
})

export default router
