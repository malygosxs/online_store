import React, { useContext, useEffect } from 'react';
import { Container } from "react-bootstrap";
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
        fetchProducts(null, null, 1, 2).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
        })
    }, [product])

    useEffect(() => {
        fetchProducts(product.selectedType.id, product.selectedBrand.id, product.page, 2).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
        })
    }, [product.page, product.selectedType, product.selectedBrand,])
    
    return (
        [
            <div className="shop_img"><img src={sneakers} /></div>,
            <Container>
                <Row className="mt-2">
                    <TypeBar />
                </Row>
                <Row className="mt-2">
                    <Col md={3}>
                        <BrandBar />
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