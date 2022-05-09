import {makeAutoObservable} from "mobx";

export default class ProductStore {
    constructor() {
        this._types = [
            {id: 1, name: 'Кроссовки'},
            {id: 2, name: 'Сумки'},
            {id: 3, name: 'Кеды'},
            {id: 4, name: 'Футболки'},
        ]
        this._brands = [
            {id: 1, name: 'Adidas'},
            {id: 2, name: 'Nike'},
        ]
        this._products = [
            {id: 1, name: "cum", image: "", purchaseReturn: true, property: {title: "blue", descripiton: "sneakers"},
            brand: 'Adidas', type: 'Кроссовки'},
            {id: 2, name: "cumpot", image: "", purchaseReturn: true, property: {title: "blue", descripiton: "sneakers"},
            brand: 'Nike', type: 'Кеды'}
        ]
        this._selectedType = {}
        this._selectedBrand = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 3
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setBrands(brands) {
        this._brands = brands
    }
    setProducts(products) {
        this._products = products
    }

    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type
    }
    setSelectedBrand(brand) {
        this.setPage(1)
        this._selectedBrand = brand
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get products() {
        return this._products
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}