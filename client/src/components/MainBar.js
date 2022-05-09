import React from 'react';
import { observer } from "mobx-react-lite";
import Image from "react-bootstrap/Image";
import sneakers from '../assets/sneakers.png'

const MainBar = observer(() => {
    return (
        <Image src={sneakers} fluid/>
    );
});

export default MainBar;