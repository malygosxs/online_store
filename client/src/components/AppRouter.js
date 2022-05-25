import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import { authRoutes, publicRoutes } from "../routes";
import { Context } from "../index";
import { observer } from "mobx-react-lite";


const AppRouter = observer(() => {
    const { user } = useContext(Context)

    console.log(user)
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({ path, Element }) =>
                <Route key={path} path={path} element={<Element />} exact />
            )}
            {publicRoutes.map(({ path, Element }) =>
                <Route key={path} path={path} element={<Element />} exact />
            )}
            {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
    );
});

export default AppRouter;