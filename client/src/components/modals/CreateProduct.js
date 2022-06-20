import React, { useContext, useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form, Row, Col, Alert } from "react-bootstrap";
import { Context } from "../../index";
import { createProduct, fetchBrands, fetchProducts, fetchTypes } from "../../http/productAPI";
import { observer } from "mobx-react-lite";

const CreateProduct = observer(({ show, onHide }) => {
    const { product } = useContext(Context)
    const [name, setName] = useState('')
    const [type, setType] = useState({})
    const [brand, setBrand] = useState({})
    const [purchaseReturn, setPurchaseReturn] = useState(false)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])

    useEffect(() => {
        fetchTypes().then(data => product.setTypes(data))
        fetchBrands().then(data => product.setBrands(data))
    }, [product])

    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addProduct = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('purchaseReturn', purchaseReturn)
        formData.append('image', file)
        formData.append('brandId', brand.id)
        formData.append('typeId', type.id)
        formData.append('info', JSON.stringify(info))
        createProduct(formData).then(() => {onHide(); return <Alert>Success</Alert>})
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add product
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle variant={"outline-light"}>{type.name || "Выберите тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {product.types.map(type =>
                                <Dropdown.Item
                                    onClick={() => setType(type)}
                                    key={type.id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle variant={"outline-light"}>{brand.name || "Выберите бренд"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {product.brands.map(brand =>
                                <Dropdown.Item
                                    onClick={() => setBrand(brand)}
                                    key={brand.id}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Product name"
                    />
                    <Form.Check
                        style={{color: "white"}}
                        type="checkbox"
                        value={purchaseReturn}
                        onChange={e => setPurchaseReturn(e.target.value)}
                        className="mt-3"
                        label="Returnable?"
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr />
                    <Button
                        variant={"outline-light"}
                        onClick={addInfo}
                    >
                        Info
                    </Button>
                    {info.map(i =>
                        <Row className="mt-4" key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    placeholder="Name"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    placeholder="Description"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removeInfo(i.number)}
                                    variant={"outline-danger"}
                                >
                                    Delete
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="outline-danger"
                    onClick={onHide}
                >
                    Cancel
                </Button>
                <Button
                    variant="outline-success"
                    onClick={addProduct}
                >
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateProduct;