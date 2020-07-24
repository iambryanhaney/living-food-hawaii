import React, { Component } from 'react'

import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

import DynamicImage from '../components/DynamicImage'

const DISH_URL = 'http://localhost:3001/dishes'
const IMAGE_PATH = '../assets/media/dish-images-assigned'

export default function Services() {
    return (
        <div >
            <h1>Services page...</h1>
            <p className='indented-paragraph'>
            Services here
            </p>
            <Container style={{  display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', border: '2px solid #000000'}}>
                Blah Blah
                <DynamicImage imgsrc={this.state.images['LFH_logo.jpg']} />
            </Container>
        </div>
    )
}