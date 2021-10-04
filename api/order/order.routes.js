const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getOrdersById } = require('./order.controller')
const router = express.Router()

router.get('/', log, getOrdersById)
module.exports = router