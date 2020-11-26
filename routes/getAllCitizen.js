import { Router } from 'express'
import London from '../models/london'

const router = Router()

router.get('/all', async (req, res) => {
    const getLondon = new London()
    res.status(200)
        .set({ 'Content-Type': 'application/json' })
        .json(await getLondon.getData())
        .end()
})

export default router
