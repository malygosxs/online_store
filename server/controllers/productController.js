const { Product, Property } = require('../models/models')
const ApiError = require('../errors/ApiError')
const path = require('path')
const uuid = require('uuid')
const fs = require('fs')
const sequelize = require('../db');

class ProductController {
    async create(req, res, next) {
        try {
            const { name, purchaseReturn, brandId, typeId, info } = req.body
            const { image } = req.files
            let filename = uuid.v4() + '.jpg'
            image.mv(path.resolve(__dirname, '..', 'static', filename))

            const product = await Product.create({ name, purchaseReturn, brandId, typeId, image: filename })

            if (info) {
                const property = JSON.parse(info)
                property.forEach(i =>
                    Property.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id
                    })
                )
            }
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res) {
        const { id } = req.params
        let product = await Product.findOne({ where: { id } })
        if (product) {
            const image = path.resolve(__dirname, '..', 'static', product.image)
            fs.unlink(image, (err) => console.log("No image"))
            product = await Product.destroy({ where: { id } })
        }
        return res.json(product)
    }

    async getAll(req, res) {
        let { brandId, typeId, limit, page } = req.query
        page = page || 1
        limit = limit || 9
        let offset = (page - 1) * limit
        let products;
        if (!brandId && !typeId) {
            products = await Product.findAndCountAll({ limit, offset })
        }
        if (brandId && !typeId) {
            products = await Product.findAndCountAll({ where: { brandId }, limit, offset })
        }
        if (!brandId && typeId) {
            products = await Product.findAndCountAll({ where: { typeId }, limit, offset })
        }
        if (brandId && typeId) {
            products = await Product.findAndCountAll({ where: { typeId, brandId }, limit, offset })
        }
        return res.json(products)
    }

    async getOne(req, res) {
        const { id } = req.params
        const product = await Product.findOne(
            {
                where: { id },
                include: [{ model: Property, as: 'info' }]
            }
        )
        return res.json(product)
    }

    async getPrices(req, res) {
        const { productId } = req.params
        const prices = await sequelize.query(`
            (SELECT sellings."id", sellings."price", sellings."createdAt", sellings."size"
            FROM sellings
            WHERE (sellings."productId" = ${productId} AND sellings."deal" = FALSE)
            UNION
            SELECT purchases."id", purchases."price", purchases."createdAt", purchases."size"
            FROM purchases
            WHERE (purchases."productId" = ${productId}) AND purchases."deal" = FALSE)
            ORDER BY "createdAt" DESC;
        `);
        return res.json(prices[0])
    }

    async getDeals(req, res) {
        const { productId } = req.params
        const prices = await sequelize.query(`
            (SELECT sellings."id", sellings."price", sellings."createdAt", sellings."size"
            FROM sellings
            WHERE (sellings."productId" = ${productId} AND sellings."deal" = TRUE)
            UNION
            SELECT purchases."id", purchases."price", purchases."createdAt", purchases."size"
            FROM purchases
            WHERE (purchases."productId" = ${productId}) AND purchases."deal" = TRUE)
            ORDER BY "createdAt" ASC;
        `);
        return res.json(prices[0])
    }
}

module.exports = new ProductController();