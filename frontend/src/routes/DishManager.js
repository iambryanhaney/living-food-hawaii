import React, {useState, useEffect, Fragment} from 'react'
import { generateImageUrl } from '../components/ImageHandler'

const DISH_URL = 'http://localhost:3001/dishes'

export default function DishManager(props) {
    const [dishes, setDishes] = useState([])

    useEffect(() => {
        let isMounted = true
        
        fetch(DISH_URL)
        .then(resp => resp.json())
        .then(resp => {
            if (resp.status) {
                alert(resp.status)
            } else if (isMounted) {
                console.log(resp)
                setDishes(resp)
            } else {
                console.log('Component unmounted; aborted dishes fetch')
            }
        })

        return () => isMounted = false
    }, [])

    //        // ActiveStorage Variants
    // const renderDishes = () => {
    //     return dishes.map(dish => 
    //         <div key={dish.id}>
    //             <p>{dish.description}</p>
    //             { dish.images.map(image => 
    //                 <Fragment key={image.blob_id}>
    //                     <img src={image.sm_url} alt=""/>
    //                     <img src={image.md_url} alt=""/>
    //                     <img src={image.lg_url} alt=""/>
    //                 </Fragment>
    //             )}
    //         </div>            
    //     )
    // }
    
            // CloudFront variants
    const renderDishes = () => {
        return dishes.map(dish => 
            <div key={dish.id}>
                <p>{dish.description}</p>
                { dish.images.map(image =>
                        <Fragment key={image.id}>
                            <img src={generateImageUrl(image, 'small')} alt=""/>
                            <img src={generateImageUrl(image, 'medium')} alt=""/>
                            <img src={generateImageUrl(image, 'large')} alt=""/>
                        </Fragment>
                )}
            </div>            
        )
    }

    return (
        <div>
            <h1>Dish Manager</h1>
            <p>Here are the dishes...</p>
            { renderDishes() }
        </div>
    )
}

