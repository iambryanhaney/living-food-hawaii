import React from 'react'

import Card from 'react-bootstrap/Card'
// import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const show_borders = false

const borders = {
    blue: { border: show_borders ? '4px solid #038cfc' : null },
    green: { border: show_borders ? '4px solid #03fcc2' : null },
    purple: { border: show_borders ? '4px solid #c603fc' : null },
}


export default function Home() {
    return (
        <>
            <Row>
                <Col style={borders.blue}>
                    <h1>Welcome to Living Food Hawaii</h1>
                </Col>
            </Row>
            <Row>
                <Col style={borders.green}>
                    <Card style={{ width: '25%', margin: '25px auto' }}>
                        <Card.Img src={require('../assets/media/LFH_logo.jpg')} />
                    </Card>
                </Col>
            </Row>
            <Row style={{ marginTop: '30px' }}>
                <Col style={borders.purple} xs={12} sm={12} md={5}>
                    {/* <Image style={{ marginTop: '30px' }} src={require('../assets/media/abby_portrait.jpeg')} thumbnail/> */}
                    <Card style={{ width: '100%', margin: '75px auto' }}>
                        <Card.Img src={require('../assets/media/abby_portrait.jpeg')} />
                    </Card>
                </Col>
                <Col>
                    <h4>Living soil, living food.</h4>
                    <p className='indented-paragraph'>
                    Building on her former career as a landscape architect, Abby Jane came to Hawaii to pursue a healthier lifestyle and build a deeper connection with the land.  Studying regenerative farming systems and learning to grow traditional Hawaiian crops naturally led her to kitchen experiments with plants like taro, breadfruit, banana, and coconut.
                    </p>
                    <p className='indented-paragraph'>
                    Abby finds inspiration in adapting familiar recipes and Southern cooking techniques that she learned by watching her mother, and incorporating seasonal, local, and organic island ingredients.  She became the Permaculture Manager at Kalani, the largest retreat center in Hawaii, sharing her knowledge of full circle gardening, cooking, and composting with volunteers from around the world.  After Kalani closed during the eruption in May 2018, Abby decided to follow her joy for cooking professionally while continuing to grow food and care for the land at home.
                    </p>
                    <p className='indented-paragraph'>
                    With a great attention to detail, she uses an architect’s design process to stay organized and creative, while maintaining a gentle and meditative energy in the kitchen that only adds to the quality of the food she creates.  As a chef, Abby is now living her passions for responsible food sourcing, reducing food waste, and sharing deeply nourishing food from the ‘aina (land.)
                    </p>
                </Col>
            </Row>
        </>
    )
}








