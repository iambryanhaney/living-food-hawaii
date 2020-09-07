import React from 'react'

import { NavLink } from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'



export default function Navigation(props) {
    return (
        <Navbar fixed="top" bg="dark" variant="dark" expand="sm">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" >
                <Nav className="mr-auto">
                    <NavLink to="/" exact activeStyle={{ color: '#00FF00' }}>Home </NavLink>
                    <NavLink to="/services" exact activeStyle={{ color: '#00FF00' }}>Services</NavLink>
                    <NavLink to="/gallery" exact activeStyle={{ color: '#00FF00' }}>Gallery</NavLink>
                    <NavLink to="/dish-manager" exact activeStyle={{ color: '#00FF00' }}>Dish Manager</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}