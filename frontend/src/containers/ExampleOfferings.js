import React, { Component } from 'react'

import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

import ImageTest01 from '../assets/media/dish-images-assigned/dish_001.jpg'
import ImageTest02 from '../assets/media/dish-images-assigned/dish_002.jpg'
import ImageTest03 from '../assets/media/dish-images-assigned/dish_003.jpg'
import ImageTest04 from '../assets/media/dish-images-assigned/dish_004.jpg'
import ImageTest05 from '../assets/media/dish-images-assigned/dish_005.jpg'
import ImageTest06 from '../assets/media/dish-images-assigned/dish_006.jpg'
import ImageTest07 from '../assets/media/dish-images-assigned/dish_007.jpg'
import ImageTest08 from '../assets/media/dish-images-assigned/dish_008.jpg'
import ImageTest09 from '../assets/media/dish-images-assigned/dish_009.jpg'
import ImageTest10 from '../assets/media/dish-images-assigned/dish_010.jpg'
import ImageTest11 from '../assets/media/dish-images-assigned/dish_011.jpg'
import ImageTest12 from '../assets/media/dish-images-assigned/dish_012.jpg'
import ImageTest13 from '../assets/media/dish-images-assigned/dish_013.jpg'
import ImageTest14 from '../assets/media/dish-images-assigned/dish_014.jpg'
import ImageTest15 from '../assets/media/dish-images-assigned/dish_015.jpg'
import ImageTest16 from '../assets/media/dish-images-assigned/dish_016.jpg'

const DISH_URL = 'http://localhost:3001/dishes'
const IMAGE_PATH = '../assets/media/dish-images-assigned'

export default class ExampleOfferings extends Component {

    constructor() {
        super()
        this.state = {
            show_borders: true,
            borders: {},
            filterMeals: null,
            filterCourses: null,
            filterDiets: null,
            filterThemes: null,
            filterEvents: null,
            filterServices: null,
            dishes: [],
        }
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
    }

    updateDishes = (dishes) => {
        this.setState({ dishes: dishes })
    }

    imageMapper = (path) => {
        // console.log(`Path: ${path}`)
        switch(path) {
            case 'dish_001.jpg':
                return ImageTest01
            case 'dish_002.jpg':
                return ImageTest02
            case 'dish_003.jpg':
                return ImageTest03
            case 'dish_004.jpg':
                return ImageTest04
            case 'dish_005.jpg':
                return ImageTest05
            case 'dish_006.jpg':
                return ImageTest06
            case 'dish_007.jpg':
                return ImageTest07
            case 'dish_008.jpg':
                return ImageTest08
            case 'dish_009.jpg':
                return ImageTest09
            case 'dish_010.jpg':
                return ImageTest10
            case 'dish_011.jpg':
                return ImageTest11
            case 'dish_012.jpg':
                return ImageTest12
            case 'dish_013.jpg':
                return ImageTest13
            case 'dish_014.jpg':
                return ImageTest14
            case 'dish_015.jpg':
                return ImageTest15
            case 'dish_016.jpg':
                return ImageTest16
            default:
                return 'https://www.rd.com/wp-content/uploads/2019/09/GettyImages-621924830.jpg'
        }
        
    }
    
    renderDishes = () => {
        return this.state.dishes.map(dish => 
            dish.images.map(image => 
                <Card key={`dish${dish.id}image${image.id}`} style={{ width: '20%', margin: '20px' }}>
                    <Card.Img variation="top" src={this.imageMapper(image.path)} />
                </Card>
            )
        )
    }
            

    render() {
        return (
            <div >
                <h1>Example Offerings page...</h1>
                <p className='indented-paragraph'>
                Images here
                </p>
                <Container style={{  display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', border: this.state.borders.black}}>
                    { this.renderDishes() }
                </Container>
            </div>
        )
    }
}