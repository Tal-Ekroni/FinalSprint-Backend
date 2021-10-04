const orderService = require('./order.service.js')
const logger = require('../../services/logger.service.js')


async function getOrdersById(req, res) {
    try {
        console.log(req.query,'hi')
      const userId = req.query.userId;
      const type = req.query.type
      const order = await orderService.query(userId,type)
      res.json(order)
    } catch (err) {
      logger.error('Failed to get order', err)
      res.status(500).send({ err: 'Failed to get order' })
    }
  }


  module.exports = {
    getOrdersById,
    // getStayById,
    // addStay,
    // updateStay,
    // removeStay
  }
  