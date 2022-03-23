const {Selling} = require('../models/models')
const ApiError = require('../errors/ApiError')

class SellingController {
    async create(req, res) {
        const {price, date, userId, productId} = req.body
        const sellings = await Selling.create({price, date, userId, productId})
        return res.json(sellings)
    }

    async delete(req, res) {
        const {id} = req.body
        const selling = await Selling.destroy({where: {id}})
        return res.json(selling)
    }

    async getAllbyUser(req, res) {
        const {userId} = req.params
        const sellings = await Selling.findAll({where: {userId}})
        return res.json(sellings)
    }
    
    async getAllbyProduct(req, res) {
        const {productId} = req.params
        const sellings = await Selling.findAll({where: {productId}})
        return res.json(sellings)
    }   
}

module.exports = new SellingController();