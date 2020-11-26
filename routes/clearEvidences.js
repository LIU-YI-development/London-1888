import { Router } from 'express'
import London from '../models/london'

const router = Router()

router.delete('/evidences', async (req, res) => {
    const getLondon = new London()
    const result = await getLondon.clearEvidences()
    result ? res.status(204).end() : res.status(401).end()
})

export default router
