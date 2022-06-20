import React, { useContext, useEffect } from 'react';
import { Container, Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import ProductList from "../components/ProductList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchBrands, fetchProducts, fetchTypes } from "../http/productAPI";
import Pages from "../components/Pages";
import sneakers from '../assets/sneakers.png'
import shop_img from "../Styles.css";

const Shop = observer(() => {
    const { product } = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => product.setTypes(data))
        fetchBrands().then(data => product.setBrands(data))
        fetchProducts(null, null, 1, product.limit).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
        })
    }, [product])

    useEffect(() => {
        fetchProducts(product.selectedType.id, product.selectedBrand.id, product.page, product.limit).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
        })
    }, [product.page, product.selectedType, product.selectedBrand, product.limit])

    return (
        [
            <div className="shop_img"><img src={sneakers} /></div>,
            <Container style={{ minHeight: "40vh" }}>
                <Row className="mt-2">
                    <TypeBar />
                </Row>
                <Row className="mt-2">
                    <Col md={3}>
                        <BrandBar />
                        <Row>
                            <div className="mt-2" style={{ color: "#cb22d1" }}>Limit:</div>
                            <Form.Control
                                style={{ boxShadow: "0 0 10px #cb22d1", borderColor: "#cb22d1", width: 75 }}
                                value={product.limit}
                                onChange={e => product.setLimit(e.target.value)}
                                className="mt-2"
                                placeholder="Limit"
                                type="number"
                                min={5}
                                max={100}
                                step={5}
                            />
                        </Row>
                    </Col>
                    <Col md={9}>
                        <ProductList />
                        <Pages />
                    </Col>
                </Row>
            </Container>
        ]
    );
});

export default Shop;