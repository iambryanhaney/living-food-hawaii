import React, { Component } from 'react'

import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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
        }
    }

    componentWillMount() {
        this.importImages()
    }

    importImages() {
        const context = require.context('../assets/media/dish-images-assigned', false, /\.(gif|jpe?g|svg)$/)
        const dishImages = {}
        context.keys().forEach(key => dishImages[key.replace('./', '')] = context(key) );
        this.setState({ dishImages: dishImages })
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
        return this.state.filteredDishes.map(dish => 
            dish.images.map(image => 
                <Card key={`dish${dish.id}image${image.id}`} style={{ width: '20%', margin: '20px' }}>
                    <Card.Img variation="top" src={this.state.dishImages[image.path]} />
                </Card>
            )
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
    


    render() {
        return (
            <div >
                <h1>Example Offerings page...</h1>
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
            </div>
        )
    }
}





/*

                        <Col xs={2} style={{ margin: '5px' }}>
                            Courses<br />
                            <select name='courses' id='courses' value={this.state.filters.courses} onChange={this.filterDishes}>
                                <option value=''>All</option>
                                <option value='ingredients'>Ingredients</option>
                                <option value='beverages'>Beverages</option>
                                <option value='appetizers'>Appetizers</option>
                                <option value='salads'>Salads</option>
                                <option value='entrees'>Entrees</option>
                                <option value='sides'>Sides</option>
                                <option value='desserts'>Desserts</option>
                            </select>
                        </Col>
                        <Col xs={2} style={{ margin: '5px' }}>
                            Diets<br />
                            <select name='diets' id='diets' value={this.state.filters.diets} onChange={this.filterDishes}>
                                <option value=''>All</option>
                                <option value='vegan'>Vegan</option>
                                <option value='vegetarian'>Vegetarian</option>
                                <option value='omnivore'>Omnivore</option>
                                <option value='gluten free'>Gluten Free</option>
                            </select>
                        </Col>
                        <Col xs={2} style={{ margin: '5px' }}>
                            Themes<br />
                            <select name='themes' id='themes' value={this.state.filters.themes} onChange={this.filterDishes}>
                                <option value=''>All</option>
                                <option value='hawaiian'>Hawaiian</option>
                                <option value='mediterranean'>Mediterannean</option>
                                <option value='italian'>Italian</option>
                                <option value='japanese'>Japanese</option>
                                <option value='thai'>Thai</option>
                                <option value='cuban'>Cuban</option>
                                <option value='eastern european'>Eastern European</option>
                                <option value='indian'>Indian</option>
                                <option value='southwestern'>Southwestern</option>
                                <option value='southern'>Southern</option>
                                <option value='mexican'>Mexican</option>
                            </select>
                        </Col>
                        <Col xs={2} style={{ margin: '5px' }}>
                            Events<br />
                            <select name='events' id='events' value={this.state.filters.events} onChange={this.filterDishes}>
                                <option value=''>All</option>
                                <option value=''></option>
                                <option value=''></option>
                                <option value=''></option>
                                <option value=''></option>
                            </select>
                        </Col>
                        <Col xs={2} style={{ margin: '5px' }}>
                            Services<br />
                            <select name='services' id='services' value={this.state.filters.services} onChange={this.filterDishes}>
                                <option value=''>All</option>
                                <option value=''></option>
                                <option value=''></option>
                                <option value=''></option>
                                <option value=''></option>
                            </select>
                        </Col>

*/