import React, { useContext } from 'react';
import { Context } from "../index";
import { Container} from "react-bootstrap";

const Profile = () => {
    const { user } = useContext(Context)

    return (
        <Container className="mt-1 d-flex justify-content-center" style={{ color: "#cb22d1" }}>
            <div>ID: {user.user.id}  Email: {user.user.email} Role: {user.user.roleId}</div>
        </Container >
    );
};

export default Profile;