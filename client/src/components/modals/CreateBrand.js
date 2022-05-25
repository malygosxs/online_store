import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { createBrand } from "../../http/productAPI";

const CreateBrand = ({ show, onHide }) => {
    const [value, setValue] = useState('')

    const addBrand = () => {
        createBrand({ name: value }).then(data => {
            setValue('')
            onHide()
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton style={{ borderRadius: 0, backgroundColor: "#cb22d1", color: "#000000", borderColor: "#cb22d1" }}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить бренд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ borderRadius: 0, backgroundColor: "#000000" }}>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        style={{ borderColor: "#cb22d1" }}
                        placeholder={"Введите название бренда"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer style={{ borderRadius: 0, backgroundColor: "#000000", borderColor: "#000000" }}>
                <Button
                    variant="outline-danger"
                    onClick={onHide}
                >
                    Закрыть
                </Button>
                <Button
                    variant="outline-success"
                    onClick={addBrand}
                >
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBrand;