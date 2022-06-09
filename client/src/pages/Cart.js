import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../index";
import { ListGroup, Container, Col, Image, Row } from 'react-bootstrap';
import trash from '../assets/trash.png'

const Cart = () => {
    const { user } = useContext(Context)
    const [cart, setCart] = useState([{}])
    useEffect(() => setCart(user.cart), [user.cart])

    return (
        <Container>
            <ListGroup >
                {user.cart.map((item, index) =>
                    <ListGroup.Item key={index} style={{ backgroundColor: "black", color: "white" }}>
                        <Row className="d-flex align-items-center">
                            <Col>
                                <Image width={100} className="mt-3" fluid src={process.env.REACT_APP_API_URL + item.image} />
                            </Col>
                            <Col>
                                {item.name}
                            </Col>
                            <Col>
                                {item.typeId}
                            </Col>
                            <Col>
                                {item.brandId}
                            </Col>
                            <Col>
                                <Image width={100} className="mt-3" fluid src={trash} style={{ backgroundColor: "black" }} onClick={() => user.deleteFromCart(index)} />
                            </Col>
                        </Row>
                    </ListGroup.Item>
                )
                }
            </ListGroup >
        </Container>
    );
};

export default Cart;