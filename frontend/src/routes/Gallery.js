import React, { useState, useEffect } from 'react'
import { generateImageUrl } from '../components/ImageHandler'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
// import 'bootstrap/dist/css/bootstrap.css'
import Modal from '../containers/Modal'

const DISH_URL = 'http://localhost:3001/dishes'
const TAG_URL = 'http://localhost:3001/tags'

export default function Gallery({setViewingGallery}) {
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
    const [filteredDishes, setFilteredDishes] = useState([])
    const [tags, setTags] = useState([])
    const [showZoomModal, setShowZoomModal] = useState(false)
    const [dishIndex, setDishIndex] = useState(null)
    const [imageIndex, setImageIndex] = useState(null)

    const filterEnabledColor = '#71bc62'
    const filterDisabledColor = null

    useEffect(() => {
        setViewingGallery(true)

        fetch(DISH_URL)
        .then(resp => resp.json())
        .then(fetchedDishes => updateDishes(fetchedDishes))
        .catch(err => console.error(err))

        fetch(TAG_URL)
        .then(resp => resp.json())
        .then(fetchedTags => updateTags(fetchedTags))
        .catch(err => console.error(err))


        return (() => {
            setViewingGallery(false)
        })
    },[])

    const updateDishes = (fetchedDishes) => {
        setDishes(fetchedDishes)
        setFilteredDishes(fetchedDishes)
    }

    const updateTags = (fetchedTags) => {
        setTags(fetchedTags)
    }

    const filterDishes = (event) => {
        const updatedFilters = {...filters, [event.target.name]: event.target.value}
        let updatedDishes = dishes
    
        for (let filter in updatedFilters) {
            if (updatedFilters[filter]) {
                updatedDishes = updatedDishes.filter(dish => 
                    dish.tags.filter(tag => tag.name === updatedFilters[filter]).length > 0
                )
            }
        }
        setFilters(updatedFilters)
        setFilteredDishes(updatedDishes)
    }
    
    const renderDishes = () => {
        const dishCards = filteredDishes.map((dish, dishIndex) => 
            dish.images.map((image, imageIndex) => 
                <div className="gallery-card" key={`dish${dish.id}image${image.id}`}>
                    <img className="gallery-card-img" src={generateImageUrl(image, 'medium')} onClick={() => showModal(dishIndex, imageIndex)} />
                </div>
            )
        )

        // Add invisible cards to prevent flex items from expanding to fill final row
        // for(let i = 0; i < (dishCards.length % 4); i++) {
        for(let i = 0; i < 2; i++) {
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

    const renderSortedSelection = (group) => {
        return (
            <div className="filter">
                <p>{ group[0].toUpperCase() + group.slice(1) }</p>
                <select style={{ width: '120px', backgroundColor: filters[group] ? filterEnabledColor : filterDisabledColor }}
                    name={group} id={group} value={filters[group]} onChange={filterDishes}>
                    <option value=''>All</option>
                    { tags.filter(tag => tag.group === group).sort((a,b) => a.name.localeCompare(b.name)).map(tag =>
                        <option key={tag.name} value={tag.name}>{tag.name.split(' ').map(name => name[0].toUpperCase() + name.slice(1)).join(' ')}</option>
                    )}
                </select>
            </div>
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

    // Main Render
    return (
        // <div className="bg-gradient">
            <div className='container gallery-container'>
                {/* <p style={{ fontSize: '1.7rem', textAlign: 'center', margin: '2rem auto 1rem auto'}}>Hi, come on in! Please sit down, take a look and get inspired by my creations!</p> */}

                {/* <p style={{ margin: '2rem 1rem 1rem -12rem', fontSize: '1.5rem'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi sapiente vel totam fuga odio autem quibusdam. Quam autem cum labore, velit odit nemo reiciendis quisquam officiis, necessitatibus blanditiis excepturi voluptatem!</p> */}
                <div className="container">
                    <div className="filter-container">
                        {/* <div className="filter">
                            <p>Meals</p>
                            <select style={{ width: '120px', backgroundColor: filters['meals'] ? filterEnabledColor : filterDisabledColor }}
                                name='meals' id='meals' value={filters.meals} onChange={filterDishes}>
                                <option value=''>All</option>
                                <option value='breakfast'>Breakfast</option>
                                <option value='lunch'>Lunch</option>
                                <option value='dinner'>Dinner</option>
                            </select>
                        </div> */}
                        {/* { renderSortedSelection('courses') }
                        { renderSortedSelection('diets') }
                        { renderSortedSelection('themes') }
                        { renderSortedSelection('events') }
                        { renderSortedSelection('services') } */}
                    </div>
                </div>
                <div className="gallery-cards-container">
                    { renderDishes() }
                </div>
                { renderZoomModal() }
            </div>
        // </div>
    )
}