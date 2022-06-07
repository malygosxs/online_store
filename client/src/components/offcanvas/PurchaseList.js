import React, { useEffect, useState } from 'react';
import Offcanvas from "react-bootstrap/Offcanvas";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import { fetchPurchasesByProduct } from "../../http/productAPI";

const PurchaseList = ({ show, onHide, purchases }) => {
    // const [purchases, setPurchases] = useState([])
    // useEffect(() => {
    //     fetchPurchasesByProduct(id).then(data => setPurchases(data))
    // }, [id])

    return (
        <Offcanvas show={show} onHide={onHide} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title><b>Спрашиваемые цены</b></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                Приведенные ниже данные являются глобальными и не включают применимые сборы, рассчитываемые при оформлении заказа.
                <ListGroup>
                    <ListGroup.Item>
                        <b>
                            <Row>
                                <Col>
                                    Дата
                                </Col>
                                <Col>
                                    Размер
                                </Col>
                                <Col>
                                    Цена
                                </Col>
                            </Row>
                        </b>
                    </ListGroup.Item>
                    {purchases.map(purchase =>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    {new Date(purchase.createdAt).toLocaleDateString()}
                                </Col>
                                <Col>
                                    {purchase.size}
                                </Col>
                                <Col>
                                    {purchase.price}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Offcanvas.Body>
        </Offcanvas>
    );
};
export default PurchaseList;