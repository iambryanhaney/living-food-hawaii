import React from 'react'
import AbbyPortrait01 from '../assets/media/abby_portrait_01.jpeg'

export default function Splash() {
    return (
        <div id="splash">
            <div className="container intro-container">
                <h1 id="intro-header">Private Chef & Catering<div id="signature">by <span id="full-name">Abby Jane</span></div></h1>
                <div className="intro-card">
                    <div className="portrait">
                        <img src={AbbyPortrait01} alt="Portrait 1" id="intro-img" />
                    </div>
                    <ul>
                        <li className="intro-list"><i className="fas fa-sun fa-2x"></i><div> Organically<br/>Grown</div></li>
                        <li className="intro-list"><i className="fas fa-carrot fa-2x"></i><div> Locally<br/>Sourced</div></li>
                        <li className="intro-list"><i className="fas fa-heart fa-2x heart-color"></i><div> Food From<br/>the Heart</div></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}