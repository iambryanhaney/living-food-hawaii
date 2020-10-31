import React from 'react'
import FruitCircle from '../assets/media/fruit_circle.jpg'
import SaladsOnPlates from '../assets/media/salads_on_plates.jpg'


export default function Contact() {
    return (
        <section id="contact" className="contact flex-columns">
            <div className="row">
                <div className="column column-a">
                    <div className="column-1">
                        <img src={SaladsOnPlates} />
                    </div>
                </div>
                <div className="column column-b">
                    <div className="column-2 bg-light-trans">
                        <h2>
                            <div>
                                <i className="fas fa-envelope-open-text contact-header" /> Contact
                                <span className="contact-header"> Abby Jane</span>
                            </div>
                            <span className="social">
                                <a href="https://www.facebook.com/abbywiltse/"><i className="fab fa-facebook"></i></a>
                                <a href="https://www.instagram.com/livingfoodhawaii/"><i className="fab fa-instagram"></i></a>
                            </span>
                        </h2>
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
    )
}