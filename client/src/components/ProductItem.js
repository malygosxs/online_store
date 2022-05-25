import React from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {useNavigate} from "react-router-dom"
import {PRODUCT_ROUTE} from "../utils/consts";

const ProductItem = ({product}) => {
    const navigate = useNavigate()
    return (
        <Col md={3} className="mt-3" onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id)}>
            <Card style={{width: 150, cursor: "pointer", backgroundColor: "#000000", color: "#ffffff"}}>
                <Image fluid src={process.env.REACT_APP_API_URL + product.image}/>
                <div className="mt-1 d-flex justify-content-between align-items-center">  
                    <div>{product.brand} {product.name}</div>
                    {/* <div className="d-flex align-items-center">
                        <div>{product.rating}</div>
                    </div> */}
                </div>
            </Card>
        </Col>
    );
};

export default ProductItem;