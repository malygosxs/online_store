const sequelize = require('../db');
const {DataTypes} = require('sequelize')

const Address = sequelize.define('address', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    city: {type: DataTypes.STRING},
    street: {type: DataTypes.STRING},
    flat: {type: DataTypes.STRING},
    postcode: {type: DataTypes.INTEGER},
})

//unique seq?
const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    surname: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING},
    patronymic: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING(14), unique: true},
})

const Role = sequelize.define('role', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
})

const Property = sequelize.define('property', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING}
})

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
})

/*const Country = sequelize.define('country', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
})*/

/*const Delivery = sequelize.define('delivery', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    date: {type: DataTypes.DATE},
    price: {type: DataTypes.DECIMAL},
})*/

/*const Model = sequelize.define('model', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    material: {type: DataTypes.STRING},
    color: {type: DataTypes.STRING},
})*/

const Purchase = sequelize.define('purchase', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    price: {type: DataTypes.DECIMAL},
    date: {type: DataTypes.DATE},
    delivery_price: {type: DataTypes.DECIMAL},
})

const Selling = sequelize.define('selling', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    price: {type: DataTypes.DECIMAL},
    date: {type: DataTypes.DATE},
})

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    image: {type: DataTypes.STRING},
    purchaseReturn: {type: DataTypes.BOOLEAN},
})

User.hasMany(Address);
Address.belongsTo(User);

Role.hasMany(User);
User.belongsTo(Role);

Brand.hasMany(Product);
Product.belongsTo(Brand);

Type.hasMany(Product);
Product.belongsTo(Type);

Product.hasMany(Property, {as: 'info'});
Property.belongsTo(Product);

User.belongsToMany(Product, {through: Selling});
Product.belongsToMany(User, {through: Selling});

User.belongsToMany(Product, {through: Purchase});
Product.belongsToMany(User, {through: Purchase});






module.exports = {
    Address, User, Role, Selling, Purchase, Product, Brand, Type, Property
}