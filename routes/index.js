import declareNormalCitizen from './declareNormalCitizen'
import declareVictim from './declareVictim'
import findKiller from './findKiller'
import clearEvidences from './clearEvidences'
import getAllCitizen from './getAllCitizen'

import { Router } from 'express'

const router = Router()

router.use(declareNormalCitizen)
router.use(declareVictim)
router.use(findKiller)
router.use(clearEvidences)
router.use(getAllCitizen)

export default router
