const { Purchase } = require('../models/models')
const ApiError = require('../errors/ApiError')

class PurchaseController {
    async create(req, res) {
        const { price, date, userId, productId, delivery_price } = req.body
        const purchase = await Purchase.create({ price, date, userId, productId, delivery_price })
        return res.json(purchase)
    }

    async delete(req, res) {
        const { id } = req.body
        const purchase = await Purchase.destroy({ where: { id } })
        return res.json(purchase)
    }

    async getAllbyUser(req, res) {
        const { userId } = req.params
        const purchases = await Purchase.findAll({ where: { userId }, order: [["createdAt", "DESC"]] })
        return res.json(purchases)
    }

    async getAllbyProduct(req, res) {
        const { productId } = req.params
        const purchases = await Purchase.findAll({ where: { productId, deal: false }, order: [["price", "DESC"]] })
        return res.json(purchases)
    }
}

module.exports = new PurchaseController();