import React from 'react';

const Basket = () => {
    console.log(process.env.REACT_APP_API_URL)
    return (
        <div className="d-flex justify-content-center" style={{color: "#cb22d1"}}>
            BASKET {process.env.REACT_APP_API_URL}
        </div>
    );
};

export default Basket;