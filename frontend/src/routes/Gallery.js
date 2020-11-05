import React, { useState, useEffect } from 'react'
import { generateImageUrl } from '../components/ImageHandler'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
// import 'bootstrap/dist/css/bootstrap.css'
import Modal from '../containers/Modal'
import SelectionCircle from '../components/SelectionCircle'

const DISH_URL = 'http://localhost:3001/dishes'
const TAG_URL = 'http://localhost:3001/tags'

export default function Gallery(props) {
    const [dishImages, setDishImages] = useState({})
    const [filters, setFilters] = useState({
        meals: '',
        courses: '',
        diets: '',
        themes: '',
        events: '',
        services: '',
    })
    const [dishes, setDishes] = useState([])
    const [filteredDishesBuffer, setFilteredDishesBuffer] = useState([])
    const [filteredDishes, setFilteredDishes] = useState([])
    const [tags, setTags] = useState([])
    const [showZoomModal, setShowZoomModal] = useState(false)
    const [dishIndex, setDishIndex] = useState(null)
    const [imageIndex, setImageIndex] = useState(null)
    const [galleryFade, setGalleryFade] = useState('')

    // Fetch dishes and tags on page load
    useEffect(() => {
        fetch(DISH_URL)
        .then(resp => resp.json())
        .then(fetchedDishes => {
            setDishes(fetchedDishes)
            setFilteredDishesBuffer(fetchedDishes)
        })
        .catch(err => console.error(err))

        fetch(TAG_URL)
        .then(resp => resp.json())
        .then(fetchedTags => setTags(fetchedTags))
        .catch(err => console.error(err))
    },[])

    // When dish buffer is updated, initiate fade-out
    useEffect(() => {
        setGalleryFade('')
    },[filteredDishesBuffer])

    // When fade-out is initiated, wait for it to complete and update dishes
    useEffect(() => {
        let fadeOut;
        if (galleryFade == '') {
            fadeOut = setTimeout(() => setFilteredDishes(filteredDishesBuffer), 500)
        }
        return () => clearTimeout(fadeOut)
    },[galleryFade])

    // When dishes are updated, initiate fade-in
    useEffect(() => {
        setGalleryFade('gc-fade-in')
    },[filteredDishes])
    
    const renderDishes = () => {
        const dishCards = filteredDishes.map((dish, dishIndex) => 
            dish.images.map((image, imageIndex) => 
                <div className="gallery-card" key={`dish${dish.id}image${image.id}`}>
                    <img className="gallery-card-img" src={generateImageUrl(image, 'medium')} onClick={() => showModal(dishIndex, imageIndex)} />
                </div>
            )
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

    const showModal = (dishIndex, imageIndex) => {
        setShowZoomModal(true)
        setDishIndex(dishIndex)
        setImageIndex(imageIndex)
    }
    
    const closeModal = () => {
        setShowZoomModal(false)
        setDishIndex(null)
        setImageIndex(null)
    }
    
    const navImageRight = () => {
        if (imageIndex < filteredDishes[dishIndex].images.length - 1) {
            setImageIndex(imageIndex + 1)
        } else if (dishIndex < filteredDishes.length - 1) {
            setDishIndex(dishIndex + 1)
            setImageIndex(0)
        } else {
            setDishIndex(0)
            setImageIndex(0)
        }
    }

    const navImageLeft = () => {
        if (imageIndex > 0) {
            setImageIndex(imageIndex - 1)
        } else if (dishIndex > 0) {
            setDishIndex(dishIndex - 1)
            setImageIndex(filteredDishes[dishIndex - 1].images.length - 1)
        } else {
            setDishIndex(filteredDishes.length - 1)
            setImageIndex(filteredDishes[filteredDishes.length - 1].images.length - 1)
        }
    }

    // Render Lightbox
    const renderZoomModal = () => {
        return dishIndex === null ? null : (
            // <p>Hello there.</p>
            <Modal modalClass="lightbox" showModal={showZoomModal} onHide={() => closeModal()}>
                <div className="modal-header" style={{ backgroundColor: '#3bc23b', textAlign: 'center' }} closeButton>
                    {filteredDishes[dishIndex].description}
                </div>
                <div className="modal-body" style={{ overflow: 'scroll', backgroundColor: '#dcdcdc' }}>
                    <Container>
                        <Row>
                            <Button style={{ backgroundColor: '#7b8487' }} onClick={() => navImageLeft()}>
                                <Col xs={1} >    
                                </Col>
                                &#10094;
                            </Button>
                            <Col xs={10}>
                                <Card>
                                    <Card.Img onClick={() => closeModal()} variation="top" src={generateImageUrl(filteredDishes[dishIndex].images[imageIndex], 'large')} />
                                </Card>
                            </Col>
                            <Button style={{ backgroundColor: '#7b8487' }} onClick={() => navImageRight()}>
                                <Col xs={1}>
                                </Col>
                                &#10095;    
                            </Button>
                            
                        </Row>
                    </Container>
                </div>
                <div className="modal-footer" style={{ backgroundColor: '#dcdcdc', textAlign: 'center' }}>
                    { filteredDishes[dishIndex].tags.map(tag => `#${tag.name} `) }
                </div>
            </Modal>
        )
    }

    const updateFilters = (group, tagName) => {
        // Copy gallery filters and inject the tag name
        const updatedFilters = {...filters, [group]: tagName}
        
        // Copy and start with the master list of all dishes, iterate the gallery filters by group key.
        // If a key has a value, it is the tag we want to filter for; map the dishes, keeping only those
        // which have a tag matching the current key.   
        let updatedDishes = dishes
        for (let filter in updatedFilters) {
            if (updatedFilters[filter]) {
                updatedDishes = updatedDishes.filter(dish => 
                    dish.tags.filter(tag => tag.name === updatedFilters[filter]).length > 0
                )
            }
        }

        // Update filter state, update dish buffer to trigger animation and re-render 
        setFilters(updatedFilters)
        setFilteredDishesBuffer(updatedDishes)
    }

    // Main Render
    return (
            <div className="gallery-container">
                <div className="filter-sticky">
                    <div className="filters-container">
                        <SelectionCircle group="meals" updateFilters={updateFilters} tags={tags} filters={filters} /> 
                        <SelectionCircle group="courses" updateFilters={updateFilters} tags={tags} filters={filters} /> 
                        <SelectionCircle group="diets" updateFilters={updateFilters} tags={tags} filters={filters} /> 
                        <SelectionCircle group="events" updateFilters={updateFilters} tags={tags} filters={filters} /> 
                        <SelectionCircle group="serving style" updateFilters={updateFilters} tags={tags} filters={filters} /> 
                    </div>
                </div>
                <div className={`gallery-cards-container ${galleryFade}`}>
                    { renderDishes() }
                </div>
                { renderZoomModal() }
            </div>
    )
}