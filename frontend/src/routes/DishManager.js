/* eslint-disable */

import React, {useState, useEffect, useRef} from 'react'
import { generateImageUrl } from '../components/ImageHandler'
import Modal from 'react-bootstrap/Modal'


const DISH_URL = 'http://localhost:3001/dishes'
const TAG_URL = 'http://localhost:3001/tags'

export default function DishManager(props) {

    const newDish = {
        description: '',
        images: [],
        tags: [],
        is_new: true,
    }

    const [dishes, setDishes] = useState([])
    const [filteredDishes, setFilteredDishes] = useState([])
    const [tags, setTags] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectedDish, setSelectedDish] = useState({...newDish})
    const [formDescription, setFormDescription] = useState('')
    const [formImagePurges, setFormImagePurges] = useState({})
    const formFileInput = useRef(null)
    const [formTags, setFormTags] = useState({})
    const [filterInput, setFilterInput] = useState('')

    useEffect(() => {
        setFilteredDishes(dishes.filter(dish => dish.description.toLowerCase().includes( filterInput.toLowerCase())))
    },[filterInput])

    // Load dishes and tags
    useEffect(() => {
        let isMounted = true
        props.setViewingGallery(true)
        
        fetch(DISH_URL)
        .then(resp => resp.json())
        .then(fetchedDishes => {
            if (isMounted) {
                const sortedDishes = fetchedDishes.sort((a,b) => new Date(b.created_at) - new Date(a.created_at) )
                setDishes(sortedDishes)
                setFilteredDishes(sortedDishes)
            } else {
                console.log('Component unmounted; aborted dishes fetch')
            }
        })

        fetch(TAG_URL)
        .then(resp => resp.json())
        .then(resp => {
            if (isMounted) { 
                setTags(resp) 
            } else {
                console.log('Aborted tag fetch')
            }
        })
        .catch(err => console.error(err))

        return () => {
            isMounted = false
            props.setViewingGallery(false)
        }
    }, [])

    // Reset form elements on change of selectedDish
    useEffect(() => {
        const initialTags = {}
        selectedDish.tags.forEach(tag => initialTags[tag.id] = true)
        setFormTags({...initialTags})
        setFormDescription(selectedDish.description)
        setFormImagePurges({})
    }, [selectedDish])


    //      ------
    //      Clicks
    //      ------

    const handleClickDish = (event, dish) => {
        // setSelectedDish(dishes[event.currentTarget.dataset.index])
        setSelectedDish(dish)
        setShowModal(true)
    }

    const handleClickCreate = (event) => {
        setShowModal(true)
    }

    const hideModal = (event) => {
        setSelectedDish({ ...newDish })
        setShowModal(false)
    }

    const handleClickDelete = (event) => {
        fetch(`${DISH_URL}/${selectedDish.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({})
        })
        .then(resp => resp.json())
        .then(resp => {
            const updatedDishes = [...dishes]
            const removeIndex = updatedDishes.findIndex(e => e.id === Number(resp.id))
            // console.log(`Response id: ${resp.id}`)
            // console.log(`updatedDishes.map{:id}: ${updatedDishes.map(e => e.id)}`)
            // console.log(`Removing index: ${removeIndex}`)
            updatedDishes.splice(removeIndex, 1)
            setDishes(updatedDishes)
            hideModal()
        })
        .catch(err => console.error(err))
    }

    const handleSubmit = (event) => {
        const formData = new FormData()

        // Attach description to form
        formData.append('dish[description]', formDescription)

        // Attach image purges to form
        for(const image_id in formImagePurges) {
            if (formImagePurges[image_id]) { 
                formData.append('purge_ids[]', image_id) 
            }
        }

        // Attach images to form
        for(let i = 0; i < formFileInput.current.files.length; i++) {
            formData.append('dish[images][]', formFileInput.current.files[i])
        }

        // Attach tag_ids to form
        let has_tags = false
        for(const tag_id in formTags) {
            if (formTags[tag_id]) { 
                has_tags = true
                formData.append('dish[tag_ids][]', tag_id) 
            }
        }
        if (!has_tags) { formData.append('dish[tag_ids][]', '') }

        if (selectedDish.is_new) {
            fetch(DISH_URL, {
                method: 'POST',
                body: formData,
            })
            .then(resp => resp.json())
            .then(resp => {
                setDishes([...dishes, resp])
                hideModal()
            })
            .catch(err => console.error(err))    
        } else {
            fetch(`${DISH_URL}/${selectedDish.id}`, {
                method: 'PATCH',
                body: formData,
            })
            .then(resp => resp.json())
            .then(resp => {
                const updatedDishes = [...dishes]
                updatedDishes[dishes.findIndex(e => e.id === resp.id)] = resp
                setDishes(updatedDishes)
                hideModal()
            })
            .catch(err => console.error(err))
        }
    }

    const handleDeleteImage = (event) => {
        setFormImagePurges({ ...formImagePurges, [event.target.dataset.id]: true})
    }

    const renderDishes = () => {
        // Helper function to calculate image sizes using 2^log4(image count).ceiling 
        const sizeCalc = dish => 2**Math.ceil( Math.log(dish.images.length || 1) / Math.log(4) )
        
        return filteredDishes.map((dish, index) => 
            <div className='dish-card' key={dish.id} onClick={e => handleClickDish(e, dish)} >
                <p>{dish.description}</p>
                <div className="images-container" style={{ gridTemplateColumns: `repeat(auto-fill, ${100 / sizeCalc(dish) - 2}%)` }}>
                    { dish.images.map(image =>
                        <img key={image.id} src={generateImageUrl(image, 'medium')} alt="" style={{ height: 150 / sizeCalc(dish) - (sizeCalc(dish)-1) * 5 / sizeCalc(dish)}} />                            
                        
                    )}
                </div>
                <p>Created: {(new Date(dish.created_at)).toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })}</p>
            </div>
        )
    }

    const renderTagGroup = (group) => {
        return (
            <div style={{ marginBottom: '0.5rem' }}> 
                <div style={{fontWeight: 'bold'}}>
                    { group[0].toUpperCase() + group.slice(1) }
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', margin: 0 }}>
                    { tags.filter(tag => tag.group === group).sort((a,b) => a.name.localeCompare(b.name)).map(tag =>
                        <div key={tag.id} style={{ display: 'inline', margin: '0.1rem 0.5rem 0.2rem 0.5rem'}}>
                            <input type="checkbox" id={`cb-${tag.id}`} key={`${tag.id}`} checked={formTags[tag.id] || false} style={{ margin: '0.3rem' }}
                                onChange={event => setFormTags({ ...formTags, [tag.id]: event.target.checked ? true : false })} />
                            <label htmlFor={`cb-${tag.id}`} style={{ margin: '0.2rem'}}>{tag.name}</label>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    const renderTags = () => {
        return (
            <>
                { renderTagGroup('meals') }
                { renderTagGroup('courses') } 
                { renderTagGroup('diets') }
                { renderTagGroup('events') }
                { renderTagGroup('serving style') }
            </>
        )
    }

    const renderModal = () => {
        return (
                <Modal size='xl' show={showModal} onHide={hideModal} keyboard={false} centered backdrop="static">
                    <Modal.Header style={{ background: '#c5e3d3', textAlign: 'center' }} closeButton>
                        <h3 style={{ width: '100%', textAlign: 'center', fontWeight: 'bold' }}>
                            { selectedDish.is_new ? 'Create Dish' : 'Edit Dish' }
                        </h3>
                    </Modal.Header>
                    <Modal.Body style={{ background: '#dcdcdc' }}>
                        <label htmlFor="description" style={{ width: '100%', textAlign: 'center', fontWeight: 'bold' }}>Description:</label>
                        <input type="text" style={{ width: '100%', marginBottom: '1rem' }} value={formDescription} placeholder="Enter a description for this dish" 
                            onChange={event => setFormDescription(event.target.value)} />

                        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '0.5rem', alignItems: 'center', justifyContent: 'center'}}>
                            { selectedDish.images.map(image => !formImagePurges[image.id] &&
                                <div key={image.id} style={{ position: 'relative', height: 'auto', width: '200px' }}>
                                    <img src={generateImageUrl(image, 'medium')} alt="" style={{ width: '100%' }} />
                                    <i data-id={image.id} className='fas fa-trash fa-2x' style={{ position: 'absolute', right: '1px', bottom: '1px', color: 'red',
                                        cursor: 'pointer', opacity: '70%'}} onClick={handleDeleteImage} />
                                </div>
                            )}
                        </div>

                        <label htmlFor="images" style={{ width: '100%', textAlign: 'center', fontWeight: 'bold' }}>Images:</label> <br />
                        <input type="file" ref={formFileInput} multiple={true} accept="image/*" /> <br /><br />
                        { renderTags() }
                    </Modal.Body>
                    <Modal.Footer style={{ textAlign: 'center', justifyContent: 'space-between' }}>
                        <div>
                            {/* { selectedDish.is_new ||  */}
                                {/* // <Button variant="danger" onClick={handleClickDelete}>Delete Dish</Button> } */}
                        </div>
                        <div>
                            {/* <Button variant="warning" onClick={hideModal} style={{ margin: '1rem'}}>Cancel</Button> */}
                            <button variant="success" onClick={handleSubmit}>
                            { selectedDish.is_new ? 'Create Dish' : 'Save Changes' }
                            </button>
                        </div>
                    </Modal.Footer>
                </Modal>
        )
    }

    return (
        <div className="container dish-manager">
            <div className="actions">
                <button className="btn-main" onClick={handleClickCreate}>Create New Dish</button>
                <input type="text" className="search-bar" placeholder="Filter by Name" onChange={e => setFilterInput(e.target.value)}/>
            </div>
            <div className="dishes-container">
                { renderDishes() }
            </div>
            { renderModal() }
        </div>
    )
}





    // // ActiveStorage Variants
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