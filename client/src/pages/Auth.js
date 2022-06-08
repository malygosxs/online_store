import React, { useContext, useState } from 'react';
import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import auth from "../Styles.css";

const Auth = observer(() => {
    const { user } = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            user.setUser(data)
            user.setIsAuth(true)
            navigate(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }

    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight * 0.861 }}
        >
            <Card style={{
                width: 600,
                background: "#000000",
                borderColor: "#cb22d1",
                boxShadow: "0 0 5px #cb22d1"
            }}
                className="mb-5 p-5">
                <h2 className="m-auto" style={{ color: "#ffffff" }}>{isLogin ? "Авторизация" : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        style={{ borderRadius: 40, boxShadow: "0 0 5px #cb22d1" }}
                        className="mt-3"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        style={{ borderRadius: 40, boxShadow: "0 0 5px #cb22d1" }}
                        className="mt-3"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3" style={{ color: "#ffffff" }}>
                        {isLogin ?
                            <div>
                                New to Sneakers? <NavLink style={{ color: "#cb22d1" }} to={REGISTRATION_ROUTE}>Sign Up!</NavLink>
                            </div>
                            :
                            <div>
                                Have an account? <NavLink style={{ color: "#cb22d1" }} to={LOGIN_ROUTE}>Log In!</NavLink>
                            </div>
                        }
                        <Button
                            className="mt-1"
                            variant="auth"
                            onClick={click}
                        >
                            {isLogin ? "Log in" : "Sign Up"}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;