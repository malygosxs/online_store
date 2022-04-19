import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import { authRoutes, publicRoutes } from "../routes";
import { SHOP_ROUTE } from "../utils/consts";
import { Context } from "../index";
import { observer } from "mobx-react-lite";


const AppRouter = observer(() => {
    const { user } = useContext(Context)

    console.log(user)
    const isAuth = true
    return (
        <Routes>
            {isAuth && authRoutes.map(({ path, Element }) =>
                <Route key={path} path={path} Element={Element} exact />
            )}
            {publicRoutes.map(({ path, Element }) =>
                <Route key={path} path={path} Element={Element} exact />
            )}
            <Navigate to={SHOP_ROUTE} />
        </Routes>
    );
});

export default AppRouter;