import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Card, Row } from "react-bootstrap";

const BrandBar = observer(() => {
    const { product } = useContext(Context)

    return (
        <Row className="d-flex">
            <Card
                style={{
                    cursor: 'pointer', backgroundColor: "black", color: "#cb22d1",
                    borderColor: !product.selectedBrand.id ? '#cb22d1' : 'white'
                }}
                key={0}
                className="p-3"
                onClick={() => product.setSelectedBrand({})}
            >
                {"Any"}
            </Card>
            {product.brands.map(brand =>
                <Card
                    style={{
                        cursor: 'pointer', backgroundColor: "black", color: "#cb22d1",
                        borderColor: brand.id === product.selectedBrand.id ? '#cb22d1' : 'white'
                    }}
                    key={brand.id}
                    className="p-3"
                    onClick={() => product.setSelectedBrand(brand)}
                >
                    {brand.name}
                </Card>
            )}
        </Row>
    );
});

export default BrandBar;