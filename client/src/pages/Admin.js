import React, { useState } from 'react';
import { Button, Container } from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateProduct from "../components/modals/CreateProduct";
import CreateType from "../components/modals/CreateType";
import { observer } from "mobx-react-lite";

const Admin = observer(() => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [productVisible, setProductVisible] = useState(false)

    return (
        <Container className="d-flex flex-column" style={{ height: window.innerHeight * 0.861 }}>
            <Button
                variant={"outline-light"}
                className="mt-4 p-2"
                onClick={() => setTypeVisible(true)}
            >
                Add type
            </Button>
            <Button
                variant={"outline-light"}
                className="mt-4 p-2"
                onClick={() => setBrandVisible(true)}
            >
                Add brand
            </Button>
            <Button
                variant={"outline-light"}
                className="mt-4 p-2"
                onClick={() => setProductVisible(true)}
            >
                Add product
            </Button>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
            <CreateProduct show={productVisible} onHide={() => setProductVisible(false)} />
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
        </Container>
    );
});

export default Admin;