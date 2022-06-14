import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._cart=[];
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }
    addToCart(item) {
        this._cart.push(item)
    }
    deleteFromCart(index) {
        console.log(index)
        this._cart.splice(index, 1)
    }

    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
    get cart() {
        return this._cart
    }
}