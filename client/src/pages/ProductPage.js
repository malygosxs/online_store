import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from 'react-router-dom'
import { fetchOneProduct, fetchDeals, fetchPurchasesByProduct, fetchSellingsByProduct, fetchPrices } from "../http/productAPI";
import SellingList from '../components/offcanvas/SellingList';
import PurchaseList from '../components/offcanvas/PurchaseList';
import PriceList from '../components/offcanvas/PriceList';
import Plot from '../components/Plot';
import price from "../Styles.css";

const ProductPage = () => {
    const [purchaseVisible, setPurchaseVisible] = useState(false)
    const [sellingVisible, setSellingVisible] = useState(false)
    const [allVisible, setAllVisible] = useState(false)
    const [product, setProduct] = useState({ info: [] })
    const { id } = useParams()
    const [deals, setDeals] = useState([{}])
    const [purchases, setPurchases] = useState([{}])
    const [sellings, setSellings] = useState([{}])
    const [prices, setPrices] = useState([{}])
    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data))
        fetchDeals(id).then(data => setDeals(data))
        fetchPurchasesByProduct(id).then(data => setPurchases(data))
        fetchSellingsByProduct(id).then(data => setSellings(data))
        fetchPrices(id).then(data => setPrices(data))
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
                    <div style={{ color: "#ffffff", font: "20px roboto" }}>Последняя сделка: {deals[0].price} руб.</div>
                    <div className="mt-3">
                        <Button variant="price">
                            <Row>
                                <Col md={10}><b>{sellings[0].price} руб. мин.</b></Col>
                                <Col><b>Купить</b></Col>
                            </Row>
                        </Button>
                    </div>
                    <div className="mt-3">
                        <Button variant="price">
                            <Row>
                                <Col md={10}><b>{purchases[0].price} руб. макс.</b></Col>
                                <Col><b>Продать/Поставить</b></Col>
                            </Row>
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
                </Col>
            </Row>
            <Plot data={deals} />
            <SellingList
                show={sellingVisible}
                onHide={() => setSellingVisible(false)}
                sellings={sellings}
                name="Предложенные цены"
            />
            <PurchaseList
                show={purchaseVisible}
                onHide={() => setPurchaseVisible(false)}
                purchases={purchases}
                name="Спрашиваемые цены"
            />
            <PriceList
                show={allVisible}
                onHide={() => setAllVisible(false)}
                prices={prices}
                name="Все сделки"
            />
        </Container >
    );
};

export default ProductPage;