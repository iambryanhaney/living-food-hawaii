import React from 'react'

import Ingredients01 from '../assets/media/ingredients_01.jpeg'





export default function Contact() {
    return (
        <>
            {/* Section C: Contact */}
            <section id="contact" className="contact flex-columns">
                <div className="row">
                    <div className="column">
                        <div className="column-1">
                            <img src={Ingredients01} alt="" />
                        </div>
                    </div>
                    <div className="column">
                        <div className="column-2 bg-light">
                            <h2><i className="fas fa-envelope-open-text contact-header"></i> Contact <span className="contact-header">Abby Jane</span></h2>
                            <form action="" className="callback-form">
                                <div className="form-contol">
                                    <label htmlFor="name"></label>
                                    <input type="text" name="name" id="name" placeholder="Name" />
                                </div>
                                <div className="form-contol">
                                    <label htmlFor="email"></label>
                                    <input type="email" name="emailaddress" id="emailaddress" placeholder="Email" />
                                </div>
                                <div className="form-contol">
                                    <label htmlFor="phone"></label>
                                    <input type="text" name="phone" id="phone" placeholder="Phone Number" />
                                </div>
                                <div className="form-contol">
                                    <label htmlFor="message"></label>
                                    <textarea name="message" id="message" placeholder="Message"></textarea>
                                </div>
                                <input type="submit" value="Send" id="submit" className="btn-main" />
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}