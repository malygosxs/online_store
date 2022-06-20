import React, { useContext } from 'react';
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, CART_ROUTE, PROFILE_ROUTE } from "../utils/consts";
import NavItem from "react-bootstrap/NavItem";
import Image from "react-bootstrap/Image";
import logo from '../assets/logo.png'
import { observer } from "mobx-react-lite";
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
            <Nav style={{ color: 'white', fontSize: "1.7rem" }}>
                {/* <NavItem
                    onClick={() => navigate(SHOP_ROUTE)}
                >
                    Blog
                </NavItem> */}
                {
                    user.isAuth ?
                        [
                            user.user.roleId === 2 ?
                                <NavItem onClick={() => navigate(ADMIN_ROUTE)}> <b>ADMIN PANEL</b> </NavItem>
                                : '',
                            <NavItem onClick={() => navigate(CART_ROUTE)}> Cart </NavItem>,
                            <NavItem onClick={() => navigate(PROFILE_ROUTE)}> Profile </NavItem>,
                            <NavItem
                                onClick={() => {
                                    logOut()
                                    navigate(SHOP_ROUTE)
                                }}
                            >
                                Log Out
                            </NavItem>
                        ]
                        : <NavItem onClick={() => navigate(LOGIN_ROUTE)}>
                            Auth
                        </NavItem>
                }
            </Nav>
        </Navbar>
    ]);
});

export default NavBar;