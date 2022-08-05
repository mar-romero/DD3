import { Router } from 'express'
import {
  createUser, getTopUsers, getTopWords, getStatistics
} from '../controllers/userControlls'

export const router = Router()

router.route('/').post(createUser)
router.route('/getTopUsers').get(getTopUsers)
router.route('/getTopWords').get(getTopWords)
router.route('/:username').get(getStatistics)

export default router
