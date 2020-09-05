import React from 'react'

// import Card from 'react-bootstrap/Card'
// import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import Image from 'react-bootstrap/Image'


const DISH_URL = 'http://localhost:3001/dishes'


export default function Services() {

    let testArr = [4,5,6]

    const testFunc = () => {
        fetch(DISH_URL)
            .then(resp => resp.json())
            .then(dishes => {
                testArr = [7,8,9]
                console.log(testArr)
                console.log(dishes)
            })
            .catch(err => console.error(err))
    }

    testFunc();

    return (
        <div >
            <h1>Services page...</h1>
            <p className='indented-paragraph'>
            Services here
            </p>
            <p>{testArr}</p>
            {/* <Container style={{  display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', border: '2px solid #000000'}}>
                Blah Blah
                <DynamicImage imgsrc={this.state.images['LFH_logo.jpg']} />
            </Container> */}
        </div>
    )
}