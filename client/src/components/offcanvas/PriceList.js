import React, { useEffect, useState } from 'react';
import Offcanvas from "react-bootstrap/Offcanvas";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { fetchPrices } from "../../http/productAPI";

const formatDate = (date) => {
    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;

    return dd + '.' + mm + '.' + yy;
};

const PriceList = ({ show, onHide, id }) => {
    const [prices, setPrices] = useState([])
    useEffect(() => {
        fetchPrices(id).then(data => setPrices(data))
    }, [id])

    return (
        <Offcanvas show={show} onHide={onHide} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title><b>Все сделки</b></Offcanvas.Title>
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
                    {prices.map(price =>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    {formatDate(new Date(price.createdAt))}
                                </Col>
                                <Col>
                                    {price.size}
                                </Col>
                                <Col>
                                    {price.price}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Offcanvas.Body>
        </Offcanvas>
    );
};
export default PriceList;