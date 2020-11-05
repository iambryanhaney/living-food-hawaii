import React from 'react'

export default function Splash({scrollRef}) {
    return (
        <div id="splash" ref={scrollRef}>
            <div className="container splash-container">
                <div id="splash-placard">
                    <h1>Living Food Hawaii</h1>
                    <div className="divider"></div>
                    Private Chef & Catering
                    <div id="signature">by <span id="full-name">Abby Jane</span></div>
                    <ul>
                        <li className="intro-list"><i className="fas fa-sun"></i> Organically Grown</li>
                        <li className="intro-list"><i className="fas fa-leaf"></i> Locally Sourced</li>
                        <li className="intro-list"><i className="fas fa-heart heart-color"></i> Food From the Heart</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}