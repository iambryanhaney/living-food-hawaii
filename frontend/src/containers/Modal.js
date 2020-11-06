/* eslint-disable */

import React, { useState, useEffect } from 'react'


export default function Modal ({showModal, onHide, modalClass, children}) {
    const modalStyleStart = { backgroundColor: 'hsla(0,0%,0%,0.0)' }
    const modalStyleEnd = { backgroundColor: 'hsla(0,0%,0%,0.5)' }
    const contentStyleStart = { opacity: 0, transform: 'translateY(-200%)' }
    const contentStyleEnd = { opacity: 1, transform: modalClass === 'login' ? 'translateY(-100%)' : null }

    const [showSelf, setShowSelf] = useState(false)
    const [modalStyle, setModalStyle] = useState(modalStyleStart)
    const [contentStyle, setContentStyle] = useState(contentStyleStart)

    const outsideClick = (event) => {
        const modal = document.getElementById('modal')
        if(event.target == modal) onHide()
    }

    useEffect(() => {
        let fadeOut

        if(showModal) {
            setShowSelf(true);
            document.body.classList.add('modal-open')
            window.addEventListener('click', outsideClick)
        }
        else {
            setModalStyle(modalStyleStart);
            setContentStyle(contentStyleStart)
            fadeOut = setTimeout(() => {
                setShowSelf(false)
                document.body.classList.remove('modal-open')
            }, 500)
        }

        return function cleanup() {
            window.removeEventListener('click', outsideClick)
            clearTimeout(fadeOut)
        }
    },[showModal])

    useEffect(() => {
        if(showSelf) {
            setModalStyle(modalStyleEnd)
            setContentStyle(contentStyleEnd)
        }
    },[showSelf])

    return (
        showSelf &&
        <div id="modal" className="modal" style={modalStyle}>
            <div className={'modal-' + modalClass} style={contentStyle}>
                {children}
            </div>
        </div>
    )
}