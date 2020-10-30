import React from 'react'
// import Logo from '../assets/media/LFH_logo_hires_trans_lines.png'
// import Logo from '../assets/media/LFH_logo_hires_black_lines.png'
// import Logo from '../assets/media/LFH_logo_hires_green_lines.png'
// import Logo from '../assets/media/LFH_logo_hires_green_lines2.png'
// import Logo from '../assets/media/LFH_logo_hires_brown_lines.png'
import Logo from '../assets/media/LFH_logo_hires_white_lines.png'
// import Logo from '../assets/media/LFH_logo_hires_white_lines_rotated_no_bg.png'

export default function Services() {
    return (
        <section id="services">
            <div className="container services-body bg-light">
                <div className="services-list-container flex-item ">
                    <ul className="services-list">
                        <li className="services-item item-festival">Festivals</li>
                        <li className="services-item item-retreats">Retreats</li>
                        <li className="services-item item-parties">Private Parties</li>
                        <li className="services-item item-dinners">Community Dinners</li>
                    </ul>
                </div>
                <div className="services-logo flex-item">
                    <img src={Logo} />
                </div>
                <div className="services-spotlight flex-item ">
                    <div>
                        <p className="spotlight-festival">Spotlight Paragraph for Festivals Goes Here. Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae explicabo repellat quae consequuntur consequatur illo officia accusamus ab possimus necessitatibus?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus neque repellendus facere odio aperiam veritatis fugiat assumenda. Laboriosam magnam deleniti nemo praesentium sapiente fugiat quisquam, a nam, adipisci quo repellendus.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

// 291.8
// 111.6