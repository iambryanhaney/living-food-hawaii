import React from 'react'
import SaladsOnPlates from '../assets/media/salads_on_plates.jpg'
import FruitCircle from '../assets/media/fruit_circle.jpg'


export default function Contact({scrollRef}) {
    return (
        <div className="container">
            <section id="contact" className="contact" ref={scrollRef}>
                <div className="contact-left-pane">
                    {/* <img src={SaladsOnPlates} alt="" /> */}
                    <img src={FruitCircle} alt="" />
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
                        <div className="form-flex">
                            <input className="input-flex" type="text" name="name" id="name" placeholder="Name" />
                            <input className="input-flex" type="email" name="emailaddress" id="emailaddress" placeholder="Email" />
                        </div>
                        <div className="form-full">
                            <input className="input-full" type="text" name="service" id="service" placeholder="Type of Service  >  Retreat, Workshop, Meal Prep, Cooking Class, Private Party, etc." />
                        </div>
                        <div className="form-flex">
                            <input className="input-flex" type="text" name="date" id="date" placeholder="Date of Event" />
                            <input className="input-flex" type="text" name="location" id="location" placeholder="Location" />
                            <input className="input-flex" type="text" name="guest-count" id="guest-count" placeholder="Number of Guests" />
                            <input className="input-flex" type="text" name="budget" id="budget" placeholder="Budget" />
                        </div>
                        <div className="form-flex">
                            <input className="input-flex" type="text" name="diet" id="diet" placeholder="Diet  >  Vegan, Vegetarian, Omnivore, Other" />
                            <input className="input-flex" type="text" name="allergies" id="allergies" placeholder="Allergies or Food Sensitivities" />
                        </div>
                        <div className="form-full">
                            <input className="input-full" type="text" name="meal-type" id="meal-type" placeholder="Type of Meal  >  Breakfast, Lunch, Dinner, Beverage, Appetizer, Dessert, etc." />
                        </div>
                        <div className="form-full">
                            <textarea name="notes" id="notes" placeholder="Notes  >  Please share any additional information that could help create an estimate for your event."></textarea>
                        </div>
                        <input className="btn-main input-full" type="submit" value="Send" id="submit" />
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