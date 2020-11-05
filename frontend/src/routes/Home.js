import React, {useEffect, useRef} from 'react'
import {useLocation} from 'react-router-dom'
import Splash from '../components/Splash.js'
import About from '../routes/About.js'
import Services from '../routes/Services.js'
import Contact from '../routes/Contact.js'
import Footer from '../routes/Footer.js'
import Gallery from '../routes/Gallery.js'


export default function Home() {
    let location = useLocation();
    const homeRef = useRef(null);
    const aboutRef = useRef(null);
    const servicesRef = useRef(null);
    const contactRef = useRef(null);
    const galleryRef = useRef(null);

    useEffect(() => {
        const pathToPositionTable = {
            '/home': homeRef.current.offsetTop - 80,
            '/about': aboutRef.current?.offsetTop - 50,
            '/services': servicesRef.current?.offsetTop - 75,
            '/contact': contactRef.current?.offsetTop - 100,
            '/gallery': galleryRef.current?.offsetTop - 85,
        }
        console.log(pathToPositionTable[location.pathname])
        window.scrollTo(0, pathToPositionTable[location.pathname])
    },[location])



    return (
        <>
            <Splash scrollRef={homeRef}/>
            <About scrollRef={aboutRef}/>
            <Services scrollRef={servicesRef}/>
            <Contact scrollRef={contactRef}/>
            <Footer />
            <Gallery scrollRef={galleryRef} viewingGallery={false} setViewingGallery={() => null} />
        </>
    )
}








