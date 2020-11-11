import React from 'react'
import SaladsOnPlates from '../assets/media/salads_on_plates.jpg'


export default function Contact({scrollRef}) {
    return (
        <div className="container">
            <section id="contact" className="contact" ref={scrollRef}>
                <div className="contact-left-pane">
                    <img src={SaladsOnPlates} alt="" />
                </div>
                <div className="contact-right-pane">
                    <h2>
                        <div>
                            <i className="fas fa-envelope-open-text contact-header-highlights" /> &nbsp;Contact Chef
                            <span className="contact-header-highlights"> Abby Jane</span>
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
                            <label htmlFor="service"></label>
                            <input type="text" name="service" id="service" placeholder="Type of Service  >  Retreat, Workshop, Meal Prep, Cooking Class, Private Party, etc." />
                        </div>
                        <div className="form-contol">
                            <label htmlFor="date"></label>
                            <input type="text" name="date" id="date" placeholder="Date of Event" />
                        </div>
                        <div className="form-contol">
                            <label htmlFor="location"></label>
                            <input type="text" name="location" id="location" placeholder="Location" />
                        </div>
                        <div className="form-contol">
                            <label htmlFor="guest-count"></label>
                            <input type="text" name="guest-count" id="guest-count" placeholder="Number of Guests" />
                        </div>
                        <div className="form-contol">
                            <label htmlFor="diet"></label>
                            <input type="text" name="diet" id="diet" placeholder="Diet  >  Vegan, Vegetarian, Omnivore, Other" />
                        </div>
                        <div className="form-contol">
                            <label htmlFor="guest-count"></label>
                            <input type="text" name="guest-count" id="guest-count" placeholder="Number of Guests" />
                        </div>
                        <div className="form-contol">
                            <label htmlFor="allergies"></label>
                            <input type="text" name="allergies" id="allergies" placeholder="Allergies or Food Sensitivities" />
                        </div>
                        <div className="form-contol">
                            <label htmlFor="meal-type"></label>
                            <input type="text" name="meal-type" id="meal-type" placeholder="Type of Meal  >  Breakfast, Lunch, Dinner, Beverage, Appetizer, Dessert, etc." />
                        </div>
                        <div className="form-contol">
                            <label htmlFor="budget"></label>
                            <input type="text" name="budget" id="budget" placeholder="Budget" />
                        </div>
                        <div className="form-contol">
                            <label htmlFor="notes"></label>
                            <textarea name="notes" id="notes" placeholder="Notes  >  Please share any additional information that could help create an estimate for your event."></textarea>
                        </div>
                        <input type="submit" value="Send" id="submit" className="btn-main" />
                    </form>
                </div>
            </section>
        </div>
    )
}

/*

Contact Chef Abby Jane 
Name:
Email:
Type of Service:
(Retreat, Workshop, Meal Prep, Cooking Class, Private Party, etc.) 
Date of Event:
Location: 
Number of Guests:
Diet: (Vegan, Vegetarian, Omnivore, Other) 
Allergies or Food Sensitivities: 
Type of Meal: 
(Breakfast, Lunch, Dinner, Beverage, Appetizer, Dessert, etc.) 
Budget:
Notes: Please share any additional information that could help create an estimate for your event.

*/