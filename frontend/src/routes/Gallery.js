import React, { useState, useEffect } from 'react'
import { generateImageUrl } from '../components/ImageHandler'
import Modal from '../containers/Modal'
import SelectionCircle from '../components/SelectionCircle'

const DISH_URL = 'http://localhost:3001/dishes'
const TAG_URL = 'http://localhost:3001/tags'

// RESTORE POINT

export default function Gallery({scrollRef, ...props}) {
    const [filters, setFilters] = useState({})
    const [dishes, setDishes] = useState([])
    const [filteredDishesBuffer, setFilteredDishesBuffer] = useState([])
    const [filteredDishes, setFilteredDishes] = useState([])
    const [tags, setTags] = useState([])
    const [showZoomModal, setShowZoomModal] = useState(false)
    const [zoomIndex, setZoomIndex] = useState(null)
    const [galleryFade, setGalleryFade] = useState('')
    const [activeCircle, setActiveCircle] = useState(true)

    // Fetch dishes and tags on page load
    useEffect(() => {
        fetch(DISH_URL)
        .then(resp => resp.json())
        .then(fetchedDishes => {
            // Flatten the dish objects
            const flattenedDishes = []
            for(let dish of fetchedDishes) {
                for (let image of dish.images) {
                    flattenedDishes.push({ description: dish.description, image: image, tags: dish.tags })
                }
            }
            setDishes(flattenedDishes)
            setFilteredDishesBuffer(flattenedDishes)
        })
        .catch(err => console.error(err))

        fetch(TAG_URL)
        .then(resp => resp.json())
        .then(fetchedTags => setTags(fetchedTags))
        .catch(err => console.error(err))
    },[])

    // When dish buffer is updated, initiate fade-out and deactivate circle menus
    useEffect(() => {
        setGalleryFade('')
        setActiveCircle(false)
    },[filteredDishesBuffer])

    // When fade-out is initiated, wait for it to complete and update dishes
    useEffect(() => {
        let fadeOut;
        if (galleryFade === '') {
            fadeOut = setTimeout(() => setFilteredDishes(filteredDishesBuffer), 500)
        }
        return () => clearTimeout(fadeOut)
    },[galleryFade, filteredDishesBuffer])

    // When dishes are updated, initiate fade-in and activate circle menus
    useEffect(() => {
        setGalleryFade('gc-fade-in')
        setActiveCircle(true)
    },[filteredDishes])
    
    const renderDishes = () => {
        // Generate a card for every image
        const dishCards = filteredDishes.map((dish, dishIndex) => 
            <div className="gallery-card" key={dishIndex}>
                <img className="gallery-card-img" alt="" src={generateImageUrl(dish.image, 'medium')} onClick={() => showModal(dishIndex)} />
            </div>
        )

        // Add invisible cards to prevent flex items from expanding to fill final row
        for(let i = 0; i < (dishCards.length % 5); i++) {
        // for(let i = 0; i < 2; i++) {
            dishCards.push(
                <div className="gallery-card-invisible" key={`invis-card-${i}`}></div>
            )
        }

        return dishCards.length > 0 ? dishCards : (
            <>
                <br />
                There are no offerings that match your exact request. Please try changing your filters.
                <br />
            </>
        )
    }

    const showModal = (dishIndex) => {
        setZoomIndex(dishIndex)
        setShowZoomModal(true)
    }
    
    const closeModal = () => {
        setShowZoomModal(false)
        setZoomIndex(null)
    }
    
    const navImageRight = () => {
        if (zoomIndex < filteredDishes.length - 1) setZoomIndex(zoomIndex + 1)
        else setZoomIndex(0)
    }

    const navImageLeft = () => {
        if (zoomIndex === 0) setZoomIndex(filteredDishes.length - 1)
        else setZoomIndex(zoomIndex - 1)
    }

    // Render Lightbox
    const renderZoomModal = () => {
        return showZoomModal && (
            <Modal modalClass="lightbox" showModal={showZoomModal} onHide={() => closeModal()}>
                <div className="modal-header" style={{ backgroundColor: 'hsl(110, 40, 56)', textAlign: 'center' }} closeButton>
                    {filteredDishes[zoomIndex].description}
                </div>
                <div className="modal-body" style={{ overflow: 'scroll', backgroundColor: '#dcdcdc' }}>
                    <img alt="" src={generateImageUrl(filteredDishes[zoomIndex].image, 'large')} />
                </div>
                <div className="modal-footer" style={{ backgroundColor: '#dcdcdc', textAlign: 'center' }}>
                    { filteredDishes[zoomIndex].tags.map(tag => 
                        <span key={tag.id} style={{ marginLeft: '0.5rem', color: 'red', backgroundColor: 'hsl(110, 40, 56)' }}>
                            { `#${tag.name}` }
                        </span>
                    ) }
                </div>
            </Modal>
        )
    }


    {/* Login Modal */}
    // <Modal modalClass="login" showModal={showModal} onHide={() => setShowModal(false)}>
    //     <div className="modal-header">
    //         <i className="far fa-times-circle fa-lg modal-closeBtn" onClick={() => setShowModal(false)}></i>
    //         <h3>Welcome back!</h3>
    //     </div>
    //     <div className="modal-body">
    //         <form className="login-form" onSubmit={handleSubmit}>
    //             <div className="form-control">
    //                 <label htmlFor="email"></label>
    //                 <input type="text" name="email" id="email" placeholder="Email Address"
    //                     onChange={event => setFormEmail(event.target.value)}/>
    //             </div>
    //             <div className="form-control">
    //                 <label htmlFor="password"></label>
    //                 <input type="password" name="password" id="password" placeholder="Password"
    //                     onChange={event => setFormPassword(event.target.value)}/>
    //             </div>
    //             <input type="submit" value="Log In" id="login-submit" className="btn-main" />
    //         </form>
    //     </div>
    // </Modal>





    const updateFilters = (group, tagName) => {
        // Scroll to the top of the gallery when filters change
        window.scrollTo(0, scrollRef.current.offsetTop - 85)

        // Copy the gallery filters and either set the tag name or delete the group if there is no tagName
        const updatedFilters = { ...filters }
        if (tagName) updatedFilters[group] = tagName
        else delete updatedFilters[group]
        
        // Start with the master list of all dishes, iterate the gallery filters,
        // keeping only the dishes whose tags include the filter tags.
        let updatedDishes = dishes
        for (let groupFilter in updatedFilters) {
            updatedDishes = updatedDishes.filter(dish => dish.tags.map(tag => tag.name).includes(updatedFilters[groupFilter]) )
        }

        // Update filter state, update dish buffer to trigger animation and re-render 
        setFilters(updatedFilters)
        setFilteredDishesBuffer(updatedDishes)
    }

    // Main Render
    return (
            <div className="gallery-container" ref={scrollRef}>
                <div className="filter-sticky">
                    <div className="filters-container">
                        <SelectionCircle group="meals" updateFilters={updateFilters} tags={tags} filters={filters} activeCircle={activeCircle}/> 
                        <SelectionCircle group="courses" updateFilters={updateFilters} tags={tags} filters={filters} activeCircle={activeCircle}/> 
                        <SelectionCircle group="diets" updateFilters={updateFilters} tags={tags} filters={filters} activeCircle={activeCircle}/> 
                        <SelectionCircle group="events" updateFilters={updateFilters} tags={tags} filters={filters} activeCircle={activeCircle}/> 
                        <SelectionCircle group="serving style" updateFilters={updateFilters} tags={tags} filters={filters} activeCircle={activeCircle}/> 
                    </div>
                </div>
                <div className={`gallery-cards-container ${galleryFade}`}>
                    { renderDishes() }
                </div>
                { renderZoomModal() }
            </div>
    )
}