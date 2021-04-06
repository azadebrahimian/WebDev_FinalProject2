import React from 'react';
import { Nav, Col, Row, Alert, Navbar } from "react-bootstrap"
import { NavLink, useHistory } from 'react-router-dom';

// Storage
import store from '../store';

// Redux
import { useSelector } from 'react-redux'

// Socket
import {socket_disconnect} from '../store'

function Link({ to, children }) {
    return (
        <Nav.Item>
            <NavLink to={to} exact className="nav-link"
                activeClassName="active">
                {children}
            </NavLink>
        </Nav.Item>
    );
}

export default function MyNav() {
    let history = useHistory();
    const error = useSelector(state => state.error);
    const success = useSelector(state => state.success);
    const session = useSelector(state => state.session);
    let error_row;
    let success_row;
    let user = "unknown";
    let logout_button;

    function logout() {
        store.dispatch({ type: 'session/clear' });
        store.dispatch({ type: 'success/set', data: 'See you soon!' })
        socket_disconnect();
        history.push("/");
    }


    if (session) {
        user = session.username;
        logout_button = <Nav.Link onClick={logout} to="/">Log Out</Nav.Link>;
    }


    if (error) {
        error_row = (
            <Row>
                <Col>
                    <Alert variant="danger">{error}</Alert>
                </Col>
            </Row>
        );
    }

    if (success) {
        success_row = (
            <Row>
                <Col>
                    <Alert variant="success">{success}</Alert>
                </Col>
            </Row>
        );
    }

    return (
        <div>
            <Navbar bg="light">
                <Navbar.Brand>Events App</Navbar.Brand>
                <Nav className="mr-auto">
                    <Link to="/">Home</Link>
                    <Link to="/ingredients">Your Ingredients</Link>
                    <Link to="/ingredients/add">Add Ingredients</Link>
                    <Link to="/mock">Mock</Link>
                </Nav>
                <Nav>
                    <Navbar.Text> Signed in as: {user} </Navbar.Text>
                    {logout_button}
                </Nav>
            </Navbar>
            { error_row || success_row}
        </div>
    )
}
