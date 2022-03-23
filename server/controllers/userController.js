const {User, Purchase, Selling} = require('../models/models')
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
        const token = generateJwt(user.id, user.email, user.roleId)
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
        const token = generateJwt(user.id, user.email, user.roleId)
        return res.json({token})
    }

    async auth(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async update(req, res) {
        const {password, surname, name, patronymic, phone, roleId} = req.body
        const token = req.headers.authorization.split(' ')[1]
        const id = jwt.verify(token, process.env.SECRET_KEY).id
        const user = await User.update(
            {password, surname, name, patronymic, phone, roleId},
            {where: {id}}
        )
        return res.json(user)
    }
}

module.exports = new UserController();