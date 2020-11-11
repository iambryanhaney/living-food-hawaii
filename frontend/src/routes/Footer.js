/* eslint-disable */

import React, { useState, useRef, useEffect } from 'react'

export default function Footer() {
    const [headerOpacity, setHeaderOpacity] = useState(1)
    const galleryRef = useRef(null)

    useEffect(() => {
        const handleScroll = () => {
            const position = galleryRef.current?.getBoundingClientRect().top
            if (position > 185) setHeaderOpacity(1)
            else if (position > 85) setHeaderOpacity((position - 85) / 100)
            else setHeaderOpacity(0)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    },[])

    return (
        <div className="footer-banner" id="footer">
            <footer className="footer bg-dark" ref={galleryRef}>
                <div style={{ opacity: headerOpacity }}>Gallery</div>
            </footer>
        </div>
    )
}