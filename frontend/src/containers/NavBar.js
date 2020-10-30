/* eslint-disable */

import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Modal from '../containers/Modal.js'
// import ModalHeader from './ModalHeader'
// import Logo from '../assets/media/LFH_logo_lowres_olive_invert.png'
// import Logo from '../assets/media/LFH_logo.png'
// import Logo from '../assets/media/LFH_logo_hires_green_lines.png'
// import Logo from '../assets/media/LFH_logo_hires_green_lines2.png'
// import Logo from '../assets/media/LFH_logo_hires_white_lines.png'
// import Logo from '../assets/media/LFH_logo_hires_trans_lines.png'
// import Logo from '../assets/media/LFH_logo_hires_black_lines.png'
import Logo from '../assets/media/LFH_logo_hires_brown_lines.png'

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
            <section id="background-banner" className={props.viewingGallery ? 'compressed' : ''} />
            <nav id="nav-trans"/>
            <nav id="main-nav">
                <a href="#background-banner"><h1 className="logo">
                    <img src={Logo} alt="Living Food Hawaii" id="logo-img" />
                    <span id="logo-text" style={{ letterSpacing: '1.3px' }}>Living Food Hawaii</span>
                </h1></a>
                <ul>
                    <li><NavLink to="/home" exact activeClassName="current">Home</NavLink></li>
                    <li><a href="#about-a">About</a></li>
                    <li><NavLink to="/services" exact activeClassName="current">Services</NavLink></li>
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

            {/* Login Modal */}
            <Modal modalClass="login" showModal={showModal} onHide={() => setShowModal(false)}>
                <div className="modal-header">
                    <i className="far fa-times-circle fa-lg closeBtn" onClick={() => setShowModal(false)}></i>
                    <h3>Welcome back!</h3>
                </div>
                <div className="modal-body">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label htmlFor="email"></label>
                            <input type="text" name="email" id="email" placeholder="Email Address"
                                onChange={event => setFormEmail(event.target.value)}/>
                        </div>
                        <div className="form-control">
                            <label htmlFor="password"></label>
                            <input type="password" name="password" id="password" placeholder="Password"
                                onChange={event => setFormPassword(event.target.value)}/>
                        </div>
                        <input type="submit" value="Log In" id="login-submit" className="btn-main" />
                    </form>
                </div>
                {/* <Modal.Footer testing="Hello"/> */}
                {/* <Modal.Body message="Haaaaayyyyyyy!"/> */}
                {/* <Modal.Footer testing="Goodbye"/> */}
            </Modal>
        </>
    )
}