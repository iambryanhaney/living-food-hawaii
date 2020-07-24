import React, { Component } from 'react'

import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

const DISH_URL = 'http://localhost:3001/dishes'
const IMAGE_PATH = '../assets/media/dish-images-assigned'

export default function DynamicImage(props) {

    function importAll(r) {
        const images = {};
        r.keys().forEach(key => images[key.replace('./', '')] = r(key) );
        return images;
    }
    
    const images = importAll(require.context('../assets/media', false, /\.(gif|jpe?g|svg)$/));

    return (
        <img src={props.imgsrc} />
    )
}