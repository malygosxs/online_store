import React, { useEffect, useState } from 'react';
import Offcanvas from "react-bootstrap/Offcanvas";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { observer } from "mobx-react-lite";
// import { fetchPrices } from "../../http/productAPI";

const PriceList = observer(({ show, onHide, prices, name }) => {
    // const [prices, setPrices] = useState([{}])
    // useEffect(() => {
    //     fetchPrices(id).then(data => setPrices(data))
    // }, [id])

    return (
        <Offcanvas show={show} onHide={onHide} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title><b>{name}</b></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                Bottom Text.
                <ListGroup>
                    <ListGroup.Item key={0}>
                        <b>
                            <Row>
                                <Col>
                                    Date
                                </Col>
                                <Col>
                                    Size
                                </Col>
                                <Col>
                                    Price
                                </Col>
                            </Row>
                        </b>
                    </ListGroup.Item>
                    {prices.map(price =>
                        <ListGroup.Item key={price.id}>
                            <Row>
                                <Col>
                                    {new Date(price.createdAt).toLocaleDateString()}
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
});
export default PriceList;