import React from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {useNavigate} from "react-router-dom"
import {PRODUCT_ROUTE} from "../utils/consts";
import bigStar from '../assets/bigStar.png'

const ProductItem = ({product}) => {
    const navigate = useNavigate()
    return (
        <Col md={3} className="mt-3" onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id)}>
            <Card style={{width: 150, cursor: "pointer", backgroundColor: "#000000", color: "#FFFFFF"}}>
                <Image width={150} height={150} src={bigStar}/>
                <div className="mt-1 d-flex justify-content-between align-items-center">  
                    <div>{product.brand} {product.name}</div>
                    <div className="d-flex align-items-center">
                        <div>{product.rating}</div>
                    </div>
                </div>
            </Card>
        </Col>
    );
};

export default ProductItem;