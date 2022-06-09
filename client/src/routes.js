import Admin from "./pages/Admin";
import {ADMIN_ROUTE, PRODUCT_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, CART_ROUTE, PROFILE_ROUTE} from "./utils/consts";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import ProductPage from "./pages/ProductPage";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Element: Admin
    },
    {
        path: CART_ROUTE,
        Element: Cart
    },
    {
        path: PROFILE_ROUTE,
        Element: Profile
    },
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Element: Shop
    },
    {
        path: LOGIN_ROUTE,
        Element: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Element: Auth
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Element: ProductPage
    },
]