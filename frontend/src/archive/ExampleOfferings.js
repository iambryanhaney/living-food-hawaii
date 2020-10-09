
import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const DISH_URL = 'http://localhost:3001/dishes'
const TAG_URL = 'http://localhost:3001/tags'

export default class ExampleOfferings extends Component {

    constructor() {
        super()
        this.state = {
            dishImages: {},
            show_borders: true,
            borders: {},
            filters: {
                meals: '',
                courses: '',
                diets: '',
                themes: '',
                events: '',
                services: '',
            },
            dishes: [],
            filteredDishes: [],
            tags: [],
            filterEnabledColor: '#34b7eb',
            filterDisabledColor: null,
            showZoomModal: false,
            dishIndex: null,
            imageIndex: null,
        }
    }

    componentWillMount() {
        this.importImages()
    }

    importImages() {
        // const context = require.context('../assets/media/dish-images-assigned', false, /\.(gif|jpe?g|svg)$/)
        // const dishImages = {}
        // context.keys().forEach(key => dishImages[key.replace('./', '')] = context(key) );
        // this.setState({ dishImages: dishImages })
    }

    componentDidMount() {

        if (this.state.show_borders) {
            this.setState({
                borders: {
                    black: '2px solid #000000',
                }
            })
        }

        fetch(DISH_URL)
        .then(resp => resp.json())
        .then(dishes => this.updateDishes(dishes))
        .catch(err => console.error(err))

        fetch(TAG_URL)
        .then(resp => resp.json())
        .then(tags => this.updateTags(tags))
        .catch(err => console.error(err))
    }

    updateDishes = (dishes) => {
        this.setState({ dishes: dishes, filteredDishes: dishes })
    }

    updateTags = (tags) => {
        this.setState({ tags: tags })
    }

    filterDishes = (event) => {
        const updatedFilters = {...this.state.filters, [event.target.name]: event.target.value}
        let updatedDishes = this.state.dishes
    
        for (let filter in updatedFilters) {
            if (updatedFilters[filter]) {
                updatedDishes = updatedDishes.filter(dish => 
                    dish.tags.filter(tag => tag.name === updatedFilters[filter]).length > 0
                )
            }
        }
        this.setState({ filters: updatedFilters, filteredDishes: updatedDishes })
    }
    
    renderDishes = () => {
        const filteredDishes = this.state.filteredDishes.map((dish, dishIndex) => 
            dish.images.map((image, imageIndex) => 
                <Card key={`dish${dish.id}image${image.id}`} style={{ width: '20%', margin: '20px' }}>
                    <Card.Img style={{ cursor: 'pointer' }} variation="top" src={this.state.dishImages[image.path]} onClick={() => this.showZoomModal(dishIndex, imageIndex)} />
                </Card>
            )
        )
        return filteredDishes.length > 0 ? filteredDishes : (
            <>
                <br />
                There are no offerings that match your exact request. Please try changing your filters.
                <br />
            </>
        )
    }

    renderSortedSelection = (group) => {
        return (
            <Col xs={12} sm={6} md={2} lg >
                { group[0].toUpperCase() + group.slice(1) }<br />
                <select style={{ backgroundColor: this.state.filters[group] ? this.state.filterEnabledColor : this.state.filterDisabledColor }}
                    name={group} id={group} value={this.state.filters[group]} onChange={this.filterDishes}>
                    <option value=''>All</option>
                    { this.state.tags.filter(tag => tag.group === group).sort((a,b) => a.name.localeCompare(b.name)).map(tag =>
                        <option key={tag.name} value={tag.name}>{tag.name.split(' ').map(name => name[0].toUpperCase() + name.slice(1)).join(' ')}</option>
                    )}
                </select>
            </Col>
        )
    }

    showZoomModal = (dishIndex, imageIndex) => {
        this.setState({ showZoomModal: true, dishIndex: dishIndex, imageIndex: imageIndex})
    }
    
    closeZoomModal = () => {
        this.setState({ showZoomModal: false, dishIndex: null, imageIndex: null})
    }
    
    navImageRight = () => {
        const filteredDishes = this.state.filteredDishes
        const dishIndex = this.state.dishIndex
        const imageIndex = this.state.imageIndex

        if (imageIndex < filteredDishes[dishIndex].images.length - 1) {
            this.setState({ imageIndex: imageIndex + 1 })
        } else if (dishIndex < filteredDishes.length - 1) {
            this.setState({ dishIndex: dishIndex + 1, imageIndex: 0 })
        } else {
            this.setState({ dishIndex: 0, imageIndex: 0 })
        }
    }

    navImageLeft = () => {
        const filteredDishes = this.state.filteredDishes
        const dishIndex = this.state.dishIndex
        const imageIndex = this.state.imageIndex

        if (imageIndex > 0) {
            this.setState({ imageIndex: imageIndex - 1 })
        } else if (dishIndex > 0) {
            this.setState({ dishIndex: dishIndex - 1, imageIndex: filteredDishes[dishIndex - 1].images.length - 1 })
        } else {
            this.setState({ dishIndex: filteredDishes.length - 1, imageIndex: filteredDishes[filteredDishes.length - 1].images.length - 1})
        }
    }

    renderZoomModal = () => {
        // return this.state.filteredDishes.length === 0 ? null : (
        return this.state.dishIndex === null ? null : (
            <Modal size='lg' show={this.state.showZoomModal} onHide={() => this.closeZoomModal()} keyboard={false} centered>
                <Modal.Header style={{ backgroundColor: '#60c9f0', textAlign: 'center' }} closeButton>
                    {/* <Modal.Title></Modal.Title> */}
                    {this.state.filteredDishes[this.state.dishIndex].description}
                </Modal.Header>
                <Modal.Body style={{ overflow: 'scroll', backgroundColor: '#dcdcdc' }}>
                    <Container>
                        <Row>
                            <Button style={{ backgroundColor: '#7b8487' }} onClick={() => this.navImageLeft()}>
                                <Col xs={1} >    
                                </Col>
                                &lt;
                            </Button>
                            <Col xs={10}>
                                <Card>
                                    <Card.Img onClick={() => this.closeZoomModal()} variation="top" src={this.state.dishImages[this.state.filteredDishes[this.state.dishIndex].images[this.state.imageIndex].path]} />
                                </Card>
                            </Col>
                            <Button style={{ backgroundColor: '#7b8487' }} onClick={() => this.navImageRight()}>
                                <Col xs={1}>
                                </Col>
                                &gt;    
                            </Button>
                            
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#dcdcdc', textAlign: 'center' }}>
                    { this.state.filteredDishes[this.state.dishIndex].tags.map(tag => `#${tag.name} `) }
                </Modal.Footer>
            </Modal>
        )
    }

    render() {
        return (
            <div >
                <h1>Example Offerings</h1>
                <Container>
                    <Row>
                        <Col xs={12} sm={6} md={2} lg >
                            Meals<br />
                            <select style={{ backgroundColor: this.state.filters['meals'] ? this.state.filterEnabledColor : this.state.filterDisabledColor }}
                                name='meals' id='meals' value={this.state.filters.meals} onChange={this.filterDishes}>
                                <option value=''>All</option>
                                <option value='breakfast'>Breakfast</option>
                                <option value='lunch'>Lunch</option>
                                <option value='dinner'>Dinner</option>
                            </select>
                        </Col>
                        { this.renderSortedSelection('courses') }
                        { this.renderSortedSelection('diets') }
                        { this.renderSortedSelection('themes') }
                        { this.renderSortedSelection('events') }
                        { this.renderSortedSelection('services') }
                    </Row>
                </Container>
                <Container style={{  display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', border: this.state.borders.black}}>
                    { this.renderDishes() }
                </Container>
                { this.renderZoomModal() }
            </div>
        )
    }
}