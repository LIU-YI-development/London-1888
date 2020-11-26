import { Router } from 'express'
import {
    NoVictimOrCitizenExistError,
    SameDistanceFromVictimError,
} from '../errors'
import London from '../models/london'

const router = Router()

router.get('/getJack', async (_, res) => {
    try {
        const getLondon = new London()
        const jack = await getLondon.getJack()
        res.status(200)
            .set({ 'Content-Type': 'application/json' })
            .json(jack)
            .end()
    } catch (error) {
        if (error instanceof NoVictimOrCitizenExistError) {
            res.status(404).send(error.message).end()
        } else if (error instanceof SameDistanceFromVictimError) {
            res.status(409).send(error.message).end()
        } else {
            console.log(error)
        }
    }
})

export default router
