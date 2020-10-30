import React from 'react'
import Splash from '../components/Splash.js'
import About from '../routes/About.js'
import Services from '../routes/Services.js'
import Contact from '../routes/Contact.js'
import Footer from '../routes/Footer.js'
import Gallery from '../routes/Gallery.js'


export default function Home() {
    return (
        <>
            <Splash />
            <About />
            <Services />
            <Contact />
            <Footer />
            <Gallery viewingGallery={false} setViewingGallery={() => null} />
        </>
    )
}








