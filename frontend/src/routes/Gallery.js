import React, { useState, useEffect } from 'react'
import { generateImageUrl } from '../components/ImageHandler'
import Modal from '../containers/Modal'
import SelectionCircle from '../components/SelectionCircle'

const DISH_URL = 'http://localhost:3001/dishes'
const TAG_URL = 'http://localhost:3001/tags'

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
                    flattenedDishes.push({ description: dish.description, image: image, tags: dish.tags, createdAt: dish.created_at })
                }
            }
            // Sort dishes by time created, from newest to oldest 
            setDishes(flattenedDishes.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt) ))
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

    // Listen for the escape key when zoom modal is rendered
    useEffect(() => {
        const handleEscape = ({key}) => {
            if (key === "Escape") closeModal()
        }

        if (showZoomModal) document.addEventListener("keydown", handleEscape)

        return () => document.removeEventListener("keydown", handleEscape)
    },[showZoomModal])
    
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
            <div className="no-matches">
                There are no offerings that match your exact request. Please try changing your filters.
            </div>
        )
    }

    const showModal = (dishIndex) => {
        setZoomIndex(dishIndex)
        setShowZoomModal(true)
    }
    
    const closeModal = () => {
        console.log('In close Modal...')
        setShowZoomModal(false)
        setZoomIndex(null)
    }

    // Render Lightbox
    const renderZoomModal = () => {
        // True modulo helper function (JavaScript's % operator is actually REMAINDER and does not handle negative values as expected)
        const mod = (n, m) => (n % m + m) % m
        const len = filteredDishes.length

        // Algorithmically generate zoomed image and its surrounding images, automatically transitioning based on zoomIndex. 
        const generateImageAndBuffers = () => {
            const buffer = 5;
            return [...Array(buffer)].map((e,i) => {
                const offset = mod(-zoomIndex - (buffer+1)/2 + i, buffer) - (buffer-1)/2
                return <img alt="" key={i} src={ generateImageUrl(filteredDishes[ mod(zoomIndex + offset, len) ]?.image) } style={
                    { 
                        opacity: mod(zoomIndex, buffer) === i ? 1 : 0,
                        pointerEvents: mod(zoomIndex, buffer) === i ? 'auto' : 'none',
                        transform: `translateX(calc(${offset} * 50vw))`,
                    }} />
            })
        }

        return (
            <Modal modalClass="lightbox" showModal={showZoomModal} onHide={() => closeModal()}>
                <div className="modal-header">
                    <i className="far fa-times-circle fa-lg modal-closeBtn" onClick={() => setShowZoomModal(false)} style={{ top: '1rem' }}></i>
                    <h3>{filteredDishes[zoomIndex]?.description}</h3>
                </div>
                
                <div className="modal-image" >
                    <div className="nav-left-pane" onClick={() => setZoomIndex(mod(zoomIndex - 1, len))}>
                        <div className="nav-left-arrow">
                            <i className="fas fa-angle-left fa-4x"></i>
                        </div>
                    </div>
                    <div className="nav-right-pane" onClick={() => setZoomIndex(mod(zoomIndex + 1, len))}>
                        <div className="nav-right-arrow">
                            <i className="fas fa-angle-right fa-4x"></i>
                        </div>
                    </div>
                    { generateImageAndBuffers() }
                </div>
                
                <div className="modal-tags" >
                    { filteredDishes[zoomIndex]?.tags?.map(tag => 
                        <span key={tag.id} >
                            { `#${tag.name}` }
                        </span>
                    ) }
                </div>
                
                <div className="modal-thumbs">
                    <div className="thumb-slider" style={{ transform: `translateX(${-60 * zoomIndex}px)`}}>
                        { filteredDishes.map((dish, index) => 
                            <div className="tiny-thumb" key={index}>
                                <img alt="" src={ generateImageUrl(dish.image, "tiny")} style={{ opacity: zoomIndex === index ? 1 : 0.3 }} />
                            </div> 
                        )}
                    </div>
                </div>
            </Modal>
        )
    }

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