import React from 'react'

import AbbyPortrait02 from "../assets/media/abby_portrait_02.jpg"
import BioFood from "../assets/media/bio_food_01.jpeg"




export default function About() {
    return (
        <>
            {/* Section A: Info */}
            <section id="about-a" className="text-center p`y-1">
                <div className="container">`
                    <div className="section-title">Living Soil <i className="fas fa-spa phrase-divider"></i> Living Food</div>
                    <div className="bottom-line"></div>
                    <div className="about-info">
                        <div className="bio-image1">
                            <img src={AbbyPortrait02} alt="" />
                        </div>
                        <div className="bio bg-light">
                            <p>Building on her former career as a landscape architect, Abby Jane came to Hawaii to pursue a healthier lifestyle and build a deeper connection with the land.  Studying regenerative farming systems and learning to grow traditional Hawaiian crops naturally led her to kitchen experiments with plants like taro, breadfruit, banana, and coconut.</p>
                        </div>
                        <img src={BioFood} alt="" className="bio-image2" />
                        <div className="bio2 bg-light">
                            <p>Abby finds inspiration in adapting familiar recipes and Southern cooking techniques that she learned by watching her mother, and incorporating seasonal, local, and organic island ingredients.  She became the Permaculture Manager at Kalani, the largest retreat center in Hawaii, sharing her knowledge of full circle gardening, cooking, and composting with volunteers from around the world.  After Kalani closed during the eruption in May 2018, Abby decided to follow her joy for cooking professionally while continuing to grow food and care for the land at home.</p>
                        </div>
                        <div className="bio3 bg-light">
                            <p>With a great attention to detail, she uses an architect’s design process to stay organized and creative, while maintaining a gentle and meditative energy in the kitchen that only adds to the quality of the food she creates.  As a chef, Abby is now living her passions for responsible food sourcing, reducing food waste, and sharing deeply nourishing food from the ‘aina (land.)</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

