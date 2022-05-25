import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from 'react-router-dom'
import { fetchOneProduct } from "../http/productAPI";
import SellingList from '../components/offcanvas/SellingList';
import PurchaseList from '../components/offcanvas/PurchaseList';
import PriceList from '../components/offcanvas/PriceList';
import price from "../Styles.css";

const ProductPage = () => {
    const [purchaseVisible, setPurchaseVisible] = useState(false)
    const [sellingVisible, setSellingVisible] = useState(false)
    const [allVisible, setAllVisible] = useState(false)
    const [product, setProduct] = useState({ info: [] })
    const { id } = useParams()
    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data))
    }, [id])

    return (
        <Container className="mt-3">
            <Row className="justify-content-between">
                <Col md={4}>
                    <h2 style={{ color: "#ffffff", font: "42px roboto" }}>{product.name}</h2>
                    <Image className="mt-3" fluid src={process.env.REACT_APP_API_URL + product.image} />
                    {product.info.map((info, index) =>
                        <Row key={info.id} className="d-flex justify-content-start" style={{ color: "#ffffff", padding: 10 }}>
                            <div md={4} style={{ font: "16px roboto" }}>
                                <b>{info.title}</b>: {info.description}
                            </div>
                        </Row>
                    )}
                </Col>
                <Col md={5} className="mt-5 pt-4 mx-auto">
                    <div style={{ color: "#ffffff", font: "20px roboto" }}>Последняя сделка: </div>
                    <div className="mt-3">
                        <Button variant="price">
                            <b>23000 Купить</b>
                        </Button>
                    </div>
                    <div className="mt-3">
                        <Button variant="price">
                            <b>32700 Продать</b>
                        </Button>
                    </div>
                    <div className="mt-3 d-flex justify-content-between">
                        <Button
                            variant="outline-light"
                            style={{ font: "bold 14px roboto", width: 157, height: 57 }}
                            onClick={() => setSellingVisible(true)}
                        >
                            Предложенные цены
                        </Button>
                        <Button
                            className="ms-3"
                            variant="outline-light"
                            style={{ font: "bold 14px roboto", width: 157, height: 57 }}
                            onClick={() => setPurchaseVisible(true)}
                        >
                            Спрашиваемые цены
                        </Button>
                        <Button
                            className="ms-3"
                            variant="outline-light"
                            style={{ font: "bold 14px roboto", width: 157, height: 57 }}
                            onClick={() => setAllVisible(true)}
                        >
                            Все сделки
                        </Button>
                    </div>
                    <SellingList
                        show={sellingVisible}
                        onHide={() => setSellingVisible(false)}
                        id={id}
                        name="Предложенные цены"
                    />
                    <PurchaseList
                        show={purchaseVisible}
                        onHide={() => setPurchaseVisible(false)}
                        id={id}
                        name="Спрашиваемые цены"
                    />
                    <PriceList
                        show={allVisible}
                        onHide={() => setAllVisible(false)}
                        id={id}
                        name="Все сделки"
                    />
                </Col>
            </Row>
        </Container >
    );
};

export default ProductPage;