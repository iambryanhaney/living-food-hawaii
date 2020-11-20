/* eslint-disable */

import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
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
    const [scrollPercent, setScrollPercent] = useState(-document.getElementById('root').getBoundingClientRect().top)

    // Update the scroll position when scrolling
    useEffect(() => {
        const handleScroll = () => {
            let h = document.documentElement, 
                b = document.body,
                st = 'scrollTop',
                sh = 'scrollHeight'
                setScrollPercent((h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 98)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    },[])

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
            <div className="logo-scrollbar-outer">
                <div className="logo-scrollbar-inner" style={{ transform: `translateY(${scrollPercent}vh)` }}>
                    <img src={Logo} alt="" />
                </div>
            </div>
            <section id="background-banner" className={props.viewingGallery ? 'compressed' : ''} />
            <nav id="nav-trans"/>
            <nav id="main-nav">
                <Link to="/home"><h1 className="logo">
                    <img src={Logo} alt="Living Food Hawaii" id="logo-img" />
                    <span id="logo-text" style={{ letterSpacing: '1.3px' }}>Living Food Hawaii</span>
                </h1></Link>
                <ul>
                    <li><NavLink to="/home" activeClassName="current">Home</NavLink></li>
                    <li><NavLink to="/about" exact activeClassName="current">About</NavLink></li>
                    <li><NavLink to="/services" exact activeClassName="current">Services</NavLink></li>
                    <li><NavLink to="/contact" exact activeClassName="current">Contact</NavLink></li>
                    <li><NavLink to="/gallery" exact activeClassName="current">Gallery</NavLink></li>
                    { props.user?.is_admin ? 
                        <>
                            <li><NavLink to="/dish-manager" exact activeClassName="current">Gallery Manager</NavLink></li>
                            <li><a onClick={() => { props.setUser(null); props.setLoginRedirected(false) }}>Logout</a></li>
                        </> : <li><a onClick={() => setShowModal(true)}>Login</a></li>
                    }
                </ul>
            </nav>

            {/* Login Modal */}
            <Modal modalClass="login" showModal={showModal} onHide={() => setShowModal(false)}>
                <div className="modal-header">
                    <i className="far fa-times-circle fa-lg modal-closeBtn" onClick={() => setShowModal(false)}></i>
                    <h3>Welcome back!</h3>
                </div>
                <div className="modal-body">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label htmlFor="email"></label>
                            <input autoFocus type="text" name="email" id="email" placeholder="Email Address"
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
            </Modal>
        </>
    )
}