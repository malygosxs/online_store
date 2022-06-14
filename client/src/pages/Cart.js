import React, { useContext} from 'react';
import { Context } from "../index";
import { ListGroup, Container, Col, Image, Row } from 'react-bootstrap';
import {useNavigate} from "react-router-dom"
import {PRODUCT_ROUTE} from "../utils/consts";
import { observer } from "mobx-react-lite";
import trash from '../assets/trash.png'

const Cart = observer(() => {
    const { user } = useContext(Context)
    const navigate = useNavigate()

    return (
        <Container style={{ height: window.innerHeight * 0.861 }}>
            <ListGroup >
                {user.cart.map((item, index) =>
                    <ListGroup.Item key={index} style={{ backgroundColor: "black", color: "white" }}>
                        <Row className="d-flex align-items-center">
                            <Col onClick={() => navigate(PRODUCT_ROUTE + '/' + item.id)}>
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
                                <Image width={50} className="mt-3" fluid src={trash} style={{ backgroundColor: "black" }} onClick={() => user.deleteFromCart(index)} />
                            </Col>
                        </Row>
                    </ListGroup.Item>
                )
                }
            </ListGroup >
        </Container>
    );
});

export default Cart;