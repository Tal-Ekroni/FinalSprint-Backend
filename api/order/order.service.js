
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')




async function query(userId,type) {
    console.log(userId, 'in query')
    try {
        const criteria = _buildCriteria(userId,type)
        const collection = await dbService.getCollection('order')
        var orders = await collection.find(criteria).toArray()
        return orders
    } catch (err) {
        console.log(err);
        logger.error('cannot find orders', err)
        throw err
    }
}


function _buildCriteria(userId,type) {
    let criteria = {}
    if (type === 'host') {

        if (userId) {
            criteria = { 'host._id': ObjectId(userId) }
        }
    }
    else {
        if (userId) {
            criteria = { 'buyer._id': ObjectId(userId) }
        }
    }
    console.log(criteria)
    return criteria
}


module.exports = {
    query

}