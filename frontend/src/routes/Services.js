import React from 'react'
// import Logo from '../assets/media/LFH_logo_hires_trans_lines.png'
import Logo from '../assets/media/LFH_logo_hires_trans_no_fill.png'
// import Logo from '../assets/media/LFH_logo_hires_black_lines.png'
// import Logo from '../assets/media/LFH_logo_hires_green_lines.png'
// import Logo from '../assets/media/LFH_logo_hires_green_lines2.png'
// import Logo from '../assets/media/LFH_logo_hires_brown_lines.png'
// import Logo from '../assets/media/LFH_logo_hires_white_lines.png'
// import Logo from '../assets/media/LFH_logo_hires_white_lines_rotated_no_bg.png'

export default function Services({scrollRef}) {
    return (
        <section id="services" ref={scrollRef}>
            <div className="container services-body bg-light">
                <div className="services-list-container flex-item ">
                    <ul className="services-list">
                        <li className="services-item item-festival">Health and Wellness Retreats</li>
                        <li className="services-item item-retreats">Workshop and Crew Lunches</li>
                        <li className="services-item item-parties">One on One or Group Cooking Classes</li>
                        <li className="services-item item-dinners">Weekly Meal Prep & Pantry Supply</li>
                        <li className="services-item item-dinners">Private Parties: Weddings & Special Events</li>
                        <li className="services-item item-dinners">Community Supper Club</li>
                        <li className="services-item item-dinners">Festival / Market Vending</li>
                    </ul>
                </div>
                <div className="services-logo flex-item">
                    <img src={Logo} />
                </div>
                <div className="services-spotlight flex-item ">
                    <div>
                        <p className="spotlight-festival"><strong>Chef Abby Jane</strong> provides a variety of personal chef services in your home, vacation rental, or event space featuring fresh, organic, and locally sourced ingredients. The best quality seasonal products always inspire her flavorful menus from purely plant based to local omnivore cuisine. Abby is always sensitive to food allergies and dietary restrictions. Please inquire with your preferences below to begin planning your next event!</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

// 291.8
// 111.6