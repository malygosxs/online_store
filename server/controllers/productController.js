const {Product, Property} = require('../models/models')
const ApiError = require('../errors/ApiError')
const path = require('path')
const uuid = require('uuid')

class ProductController {
    async create(req, res, next) {
        try {
            const {name, purchaseReturn, brandId, typeId, info} = req.body
            const {image} = req.files
            let filename = uuid.v4() + '.jpg'
            image.mv(path.resolve(__dirname,'..', 'static', filename))
            
            const product = await Product.create({name, purchaseReturn, brandId, typeId, image: filename})

            if(info) {
                info = JSON.parse(info)
                info.forEach(i => {
                    Property.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id
                    })
                });
            }

            return res.json(product)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res) {

    }

    async getAll(req, res) {
        const {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 10
        let offset = page * limit - limit
        let products;
        if (!brandId && !typeId) {
            products = await Product.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            products = await Product.findAndCountAll({where:{brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            products = await Product.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (brandId && typeId) {
            products = await Product.findAndCountAll({where:{typeId, brandId}, limit, offset})
        }
        return res.json(products)
    }

    async getOne(req, res) {
        const {id} = req.params
        const product = await Product.findOne(
            {
                where: {id},
                include: [{model: Property, as: 'info'}]
            }
        )
        return res.json(product)
    }
}

module.exports = new ProductController();