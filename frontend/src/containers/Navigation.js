import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Logo from '../assets/media/LFH_logo_lowres_green.png'

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
            {/* Header */}
            
            <header id="header-home" style={{ height: props.viewingGallery ? '85px' : '100vh' }}>
                <nav id="main-nav">
                    <a href="#header-home"><h1 className="logo">
                        <img src={Logo} alt="Living Food Hawaii" id="logo-img" />
                        <span id="logo-text">Living Food Hawaii</span>
                    </h1></a>
                    <ul>
                        <li><NavLink to="/#header-home" exact activeClassName="current">Home</NavLink></li>
                        <li><a href="#about-a">About</a></li>
                        {/* <li><a href="services.html">Services</a></li> */}
                        <li><a href="#contact">Contact</a></li>
                        <li><NavLink to="/gallery" exact activeClassName="current">Gallery</NavLink></li>
                        { props.user?.is_admin ? 
                            <>
                                <li><NavLink to="/dish-manager" exact activeClassName="current">Dish Manager</NavLink></li>
                                <li><a href="#" onClick={() => props.setUser(null)}>Logout</a></li>
                            </> : <li><a href="#" onClick={() => setShowModal(true)}>Login</a></li>
                        }
                    </ul>
                </nav>
            </header>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
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