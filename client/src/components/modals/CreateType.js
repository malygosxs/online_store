import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import { createType } from "../../http/productAPI";

const CreateType = ({ show, onHide }) => {
    const [value, setValue] = useState('')

    const addType = () => {
        createType({ name: value }).then(data => {
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
                    Add type
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ borderRadius: 0, backgroundColor: "#000000" }}>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        style={{ borderColor: "#cb22d1" }}
                        placeholder={"Type name"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer style={{ borderRadius: 0, backgroundColor: "#000000", borderColor: "#000000" }}>
                <Button
                    variant="outline-danger"
                    onClick={onHide}
                >
                    Cancel
                </Button>
                <Button
                    variant="outline-success"
                    onClick={addType}
                >
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;