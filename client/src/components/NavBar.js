import React, { useContext } from 'react';
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, BASKET_ROUTE } from "../utils/consts";
import NavItem from "react-bootstrap/NavItem";
import Image from "react-bootstrap/Image";
import logo from '../assets/logo.png'
import { observer } from "mobx-react-lite";
//import Container from "react-bootstrap/Container";
import { useNavigate } from 'react-router-dom'
const NavBar = observer(() => {
    const { user } = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return ([
        <Navbar className="d-flex justify-content-center" bg="black">
            <Image width={265} height={73} src={logo} onClick={() => navigate(SHOP_ROUTE)} />
        </Navbar>,
        <Navbar className="d-flex justify-content-center" bg="black">
            <Nav style={{ color: 'white' }}>
                <NavItem
                    onClick={() => navigate(SHOP_ROUTE)}
                >
                    Блог
                </NavItem>
                {
                    user.isAuth ?
                        [
                            <NavItem
                                onClick={() => navigate(BASKET_ROUTE)}
                                className="ms-4"
                            >
                                Корзина
                            </NavItem>,
                            <NavItem
                                onClick={() => navigate(ADMIN_ROUTE)}
                                className="ms-4"
                                style={{ color: "#f82dff" }}
                            >
                                Админ панель
                            </NavItem>,
                            <NavItem
                                onClick={() => navigate(SHOP_ROUTE)}
                                className="ms-4"
                            >
                                Профиль
                            </NavItem>,
                            <NavItem
                                onClick={() => {
                                    logOut()
                                    navigate(SHOP_ROUTE)
                                }}
                                className="ms-4"
                            >
                                Выйти
                            </NavItem>
                        ]
                        :
                        <NavItem
                            onClick={() => navigate(LOGIN_ROUTE)}
                            className="ms-4"
                        >
                            Авторизация
                        </NavItem>
                }
            </Nav>
        </Navbar>
    ]);
});

export default NavBar;