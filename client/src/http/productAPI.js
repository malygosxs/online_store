import { $authHost, $host } from "./index";

export const createType = async (type) => {
    const { data } = await $authHost.post('api/type/', type)
    return data
}

export const fetchTypes = async () => {
    const { data } = await $host.get('api/type/')
    return data
}

export const deleteType = async (id) => {
    const { data } = await $authHost.delete('api/type/', id)
    return data
}

export const createBrand = async (brand) => {
    const { data } = await $authHost.post('api/brand/', brand)
    return data
}

export const fetchBrands = async () => {
    const { data } = await $host.get('api/brand/',)
    return data
}

export const deleteBrand = async (id) => {
    const { data } = await $authHost.delete('api/brand/', id)
    return data
}

export const createProduct = async (product) => {
    const { data } = await $authHost.post('api/product/', product)
    return data
}

export const fetchProducts = async (typeId, brandId, page, limit = 5) => {
    const { data } = await $host.get('api/product/',
        {
            params: {
                typeId, brandId, page, limit
            }
        })
    return data
}

export const fetchOneProduct = async (id) => {
    const { data } = await $host.get('api/product/' + id)
    return data
}

export const deleteProduct = async (id) => {
    const { data } = await $authHost.delete('api/product/' + id)
    return data
}

export const fetchPurchasesByUser = async (id) => {
    const { data } = await $host.get('api/purchase/user/' + id)
    return data
}

export const fetchPurchasesByProduct = async (id) => {
    const { data } = await $host.get('api/purchase/product/' + id)
    return data
}

export const fetchSellingsByUser = async (id) => {
    const { data } = await $host.get('api/selling/user/' + id)
    return data
}

export const fetchSellingsByProduct = async (id) => {
    const { data } = await $host.get('api/selling/product/' + id)
    return data
}

export const fetchPrices = async (id) => {
    const { data } = await $host.get('api/product/prices/' + id)
    return data
}

export const fetchDeals = async (id) => {
    const { data } = await $host.get('api/product/deals/' + id)
    return data
}