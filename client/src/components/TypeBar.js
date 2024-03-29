import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import Nav from "react-bootstrap/Nav";
import NavItem from "react-bootstrap/NavItem";

const TypeBar = observer(() => {
    const { product } = useContext(Context)
    return (
        <Nav className="d-flex justify-content-center" style={{ color: 'white', fontSize: "2rem" }}>
            {product.types.map(type =>
                <NavItem
                    style={{ color: type.id === product.selectedType.id ? "#cb22d1" : "#ffffff" }}
                    className="nav_item"
                    active={type.id === product.selectedType.id}
                    onClick={() => product.setSelectedType(type)}
                    key={type.id}
                >
                    {type.name}
                </NavItem>
            )}
        </Nav>
    );
});

export default TypeBar;