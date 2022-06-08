import React, { useEffect, useState } from 'react';
import Offcanvas from "react-bootstrap/Offcanvas";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import { fetchSellingsByProduct } from "../../http/productAPI";

const SellingList = ({ show, onHide, sellings }) => {
    // const [sellings, setSellings] = useState([])
    // useEffect(() => {
    //     fetchSellingsByProduct(id).then(data => setSellings(data))
    // }, [id])

    return (
        <Offcanvas show={show} onHide={onHide} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title><b>Offers</b></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                Bottom text.
                <ListGroup>
                    <ListGroup.Item>
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
                    {sellings.map(selling =>
                        <ListGroup.Item key={selling.id}>
                            <Row>
                                <Col>
                                    {new Date(selling.createdAt).toLocaleDateString()}
                                </Col>
                                <Col>
                                    {selling.size}
                                </Col>
                                <Col>
                                    {selling.price}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Offcanvas.Body>
        </Offcanvas>
    );
};
export default SellingList;