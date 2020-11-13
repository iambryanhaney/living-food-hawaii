import React from 'react'
// import Logo from '../assets/media/LFH_logo_hires_trans_lines.png'
import Logo from '../assets/media/LFH_logo_hires_trans_no_fill.png'
// import Logo from '../assets/media/LFH_logo_hires_black_lines.png'
// import Logo from '../assets/media/LFH_logo_hires_green_lines.png'
// import Logo from '../assets/media/LFH_logo_hires_green_lines2.png'
// import Logo from '../assets/media/LFH_logo_hires_brown_lines.png'
// import Logo from '../assets/media/LFH_logo_hires_white_lines.png'
// import Logo from '../assets/media/LFH_logo_hires_white_lines_rotated_no_bg.png'
import ExampleMenu01PDF from '../assets/media/sample_menu_01.pdf'
import ExampleMenu01PNG from '../assets/media/sample_menu_01.png'
import ExampleMenu02PDF from '../assets/media/sample_menu_02.pdf'
import ExampleMenu02PNG from '../assets/media/sample_menu_02.png'

// RESTORE POINT

export default function Services({scrollRef}) {
    return (
        <section id="services" ref={scrollRef}>
            <div className="container" style={{ overflow: 'visible' }}>

            
            <div className="container services-body bg-light">
                <div className="services-logo">
                    <img src={Logo} alt="" />
                </div>
                <div className="services-left">
                    <div className="services-title">Personal Chef & Catering Services </div>
                    <ul className="services-list">
                        <li className="services-item">Health and Wellness <span>Retreats</span></li>
                        <li className="services-item"><span>Workshops</span> and Crew Lunches</li>
                        <li className="services-item">One on One or Group <span>Cooking Classes</span></li>
                        <li className="services-item">Weekly <span>Meal Prep</span> & Pantry Supply</li>
                        <li className="services-item"><span>Private Parties</span>: Weddings & Special Events</li>
                        <li className="services-item item-dinners">Community <span>Supper Club</span></li>
                        <li className="services-item item-dinners"><span>Festival</span> / Market Vending</li>
                    </ul>
                </div>
                <div className="services-right">
                    <p><strong>Chef Abby Jane</strong> provides a variety of personal chef services in your home, vacation rental, or event space featuring fresh, organic, and locally sourced ingredients. The best quality seasonal products always inspire her flavorful menus, from purely plant based to local omnivore cuisine. Abby is always sensitive to food allergies and dietary restrictions. Please inquire with your preferences below to begin planning your next event!</p>
                    <div className="example-menus">
                        <div>
                            Sample Menus
                        </div>
                        <a href={ExampleMenu01PDF} target="_blank" rel="noopener noreferrer"><img src={ExampleMenu01PNG} alt=""/></a>
                        <a href={ExampleMenu02PDF} target="_blank" rel="noopener noreferrer"><img src={ExampleMenu02PNG} alt=""/></a>
                        <a href={ExampleMenu01PDF} target="_blank" rel="noopener noreferrer"><img src={ExampleMenu01PNG} alt=""/></a>
                    </div>
                </div>
            </div>
            </div>
        </section>
    )
}

// 291.8
// 111.6