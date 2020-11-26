import { Router } from 'express'
import London from '../models/london'

const router = Router()

router.post('/citizen/:name/:posX/:posY', async (req, res) => {
    const { name, posX, posY } = req.params
    try {
        if (parseInt(posX) && parseInt(posY) && name) {
            const getLondon = new London()
            let createdElements = await getLondon.addCitizen(
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
        console.error(err)
        throw err
    }
})

export default router
