import React, { useState } from 'react'

import { NavLink } from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const LOGIN_URL = 'http://localhost:3001/login'

export default function Navigation(props) {
    const [showModal, setShowModal] = useState(false)
    const [formEmail, setFormEmail] = useState('')
    const [formPassword, setFormPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        // Generate JWT
        fetch(LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                email: formEmail,
                password: formPassword
            })
        })
        .then(resp => resp.json())
        .then(resp => {
            if (resp.user) {
                console.log('Successful login...')
                window.localStorage.jwt = resp.jwt
                props.setUser(resp.user)
            } else {
                console.log('Failed login...')
            }
            hideModal()
        })
    }

    const hideModal = () => {
        setFormEmail('')
        setFormPassword('')
        setShowModal(false)
    }

    return (
        <>
            <Navbar fixed="top" bg="dark" variant="dark" expand="sm">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" style={{ display: 'flex', alignItems: 'space-between' }}>
                    <Nav className="mr-auto">
                        <NavLink to="/" exact activeStyle={{ color: '#00FF00' }}>Home </NavLink>
                        <NavLink to="/services" exact activeStyle={{ color: '#00FF00' }}>Services</NavLink>
                        <NavLink to="/gallery" exact activeStyle={{ color: '#00FF00' }}>Gallery</NavLink>
                        { props.user && props.user.is_admin && <NavLink to="/dish-manager" exact activeStyle={{ color: '#00FF00' }}>Dish Manager</NavLink> }
                    </Nav>
                    <div>
                        <Button variant="primary" onClick={() => setShowModal(true)}>Login</Button>
                    </div>
                </Navbar.Collapse>
            </Navbar>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header>
                    <h3 style={{ width: '100%', textAlign: 'center', fontWeight: 'bold' }}>
                        Login
                    </h3>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div style={{ width: '75%', margin: 'auto' }}>
                            <label htmlFor="email" style={{ width: '100%', textAlign: 'center', fontWeight: 'bold', display: 'inline', marginRight: '10px' }}>Email</label>
                            <input type="text" name="email" id="email" style={{ width: '75%', marginBottom: '1rem', display: 'inline' }} 
                                placeholder="Enter a valid email address" onChange={event => setFormEmail(event.target.value)}/>
                        </div>
                        
                        <div style={{ width: '75%', margin: 'auto' }}>
                            <label htmlFor="password" style={{ width: '100%', textAlign: 'center', fontWeight: 'bold', display: 'inline', marginRight: '10px' }}>Password</label>
                            <input type="password" name="password" id="password" style={{ width: '75%', marginBottom: '1rem', display: 'inline' }}
                                placeholder="Enter a password" onChange={event => setFormPassword(event.target.value)}/>

                            <input type="submit" value="Submit" hidden/>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}