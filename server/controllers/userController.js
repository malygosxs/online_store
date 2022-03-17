const {User, Role, Purchase, Selling} = require('../models/models')
const ApiError = require('../errors/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
        )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, roleId} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или пароль'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким именем уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, roleId, password: hashPassword})
        const role = await Role.findOne({where: {id: user.roleId}})
        const token = generateJwt(user.id, user.email, role.name)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.badRequest('Пользователь с таким email не существует'))
        }
        let comparePass = bcrypt.compareSync(password, user.password)
        if (!comparePass) {
            return next(ApiError.badRequest('Неверный пароль'))
        }
        const role = await Role.findOne({where: {id: user.roleId}})
        const token = generateJwt(user.id, user.email, role.name)
        return res.json({token})
    }

    async check(req, res, next) {
        const {id} = req.query;
        if (!id) {
            return next(ApiError.badRequest('нет ид'))
        }
        res.json(await User.findOne({where: {id}}));
    }
}

module.exports = new UserController();