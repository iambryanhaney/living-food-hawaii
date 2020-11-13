/* eslint-disable */

import React, {useState, useEffect, useRef} from 'react'
import { generateImageUrl } from '../components/ImageHandler'
import Modal from '../containers/Modal'


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
    const [uploadPreviews, setUploadPreviews] = useState([])
    const [formTags, setFormTags] = useState({})
    const [filterInput, setFilterInput] = useState('')

    // Load dishes and tags
    useEffect(() => {
        let isMounted = true
        props.setViewingGallery(true)
        
        fetch(DISH_URL)
        .then(resp => resp.json())
        .then(fetchedDishes => {
            if (isMounted) setDishes(fetchedDishes)
            else console.log('Component unmounted; aborted dishes fetch')
        })

        fetch(TAG_URL)
        .then(resp => resp.json())
        .then(resp => {
            if (isMounted) setTags(resp) 
            else console.log('Aborted tag fetch')
        })
        .catch(err => console.error(err))

        return () => {
            isMounted = false
            props.setViewingGallery(false)
        }
    }, [])

    // Reset and sort filteredDishes whenever the master dish list updates
    useEffect(() => {
        const sortedDishes = dishes.sort((a,b) => new Date(b.created_at) - new Date(a.created_at) )
        setFilteredDishes(sortedDishes.filter(dish => dish.description.toLowerCase().includes( filterInput.toLowerCase())))
    },[dishes])

    // Update filteredDishes based on filterInput string 
    useEffect(() => {
        setFilteredDishes(dishes.filter(dish => dish.description.toLowerCase().includes( filterInput.toLowerCase())))
    },[filterInput])

    // Reset form elements on change of selectedDish
    useEffect(() => {
        const initialTags = {}
        selectedDish.tags.forEach(tag => initialTags[tag.id] = true)
        setFormTags({...initialTags})
        setFormDescription(selectedDish.description)
        setFormImagePurges({})
    }, [selectedDish])

    const handleClickDish = (event, dish) => {
        setSelectedDish(dish)
        setShowModal(true)
    }

    const hideModal = (event) => {
        setSelectedDish({ ...newDish })
        setUploadPreviews([])
        setShowModal(false)
    }

    const handleFileSelection = (event) => {
        // Release any previous ObjectURLs to avoid memory leaks, then generate new ObjectURLS
        uploadPreviews.forEach(imageURL => URL.revokeObjectURL(imageURL))
        setUploadPreviews([...event.target.files].map(file => URL.createObjectURL(file)))
    }

    const handleDelete = (event) => {
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

    const renderDishes = () => {

        // Helper function to calculate image sizes using 2^log4(image count).ceiling 
        const sizeCalc = dish => 2**Math.ceil( Math.log(dish.images.length || 1) / Math.log(4) )
        
        return (filteredDishes.length > 0 && filteredDishes.map((dish, index) => 
            <div className='dish-card' key={dish.id} onClick={e => handleClickDish(e, dish)} >
                <p>{dish.description}</p>
                <div className="images-container" style={{ gridTemplateColumns: `repeat(auto-fill, ${100 / sizeCalc(dish) - 2}%)` }}>
                    { dish.images.map(image =>
                        <img key={image.id} src={generateImageUrl(image, 'medium')} alt="" style={{ height: 150 / sizeCalc(dish) - (sizeCalc(dish)-1) * 5 / sizeCalc(dish)}} />                            
                    )}
                </div>
                <p>Created: {(new Date(dish.created_at)).toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })}</p>
            </div>
        )) || 'No matching dishes.'
    }

    const renderTags = (group) => {

        const sortTagNames = (group, nameA, nameB) => {
            // MEALS are sorted by time of day via lookup table.
            // EVENTS are sorted in a specific order (Abby's preference) via lookup table.
            const customOrder = {
                'breakfast': 0,
                'lunch': 1,
                'dinner': 2,
                'retreats': 0,
                'private parties': 1,
                'weddings': 2,
                'supper club': 3,
            }
            if (group === 'meals') return customOrder[nameA] - customOrder[nameB]
            else if (group === 'events') return customOrder[nameA] - customOrder[nameB] 
            else return nameA.localeCompare(nameB)
        }

        return (
            <div className="form-tags-column"> 
                <div className="form-tags-header" style={{fontWeight: 'bold'}}>
                    { group[0].toUpperCase() + group.slice(1) }
                </div>
                { tags.filter(tag => tag.group === group).sort((a,b) => sortTagNames(group, a.name, b.name)).map(tag =>
                    <div className={`form-tag active-${!!formTags[tag.id]}`} key={tag.id} onClick={() => setFormTags({ ...formTags, [tag.id]: !formTags[tag.id] })} >
                        #{tag.name}
                    </div>
                )}
            </div>
        )
    }

    const renderModal = () => {
        return (
                <Modal showModal={showModal} onHide={hideModal} modalClass="dish-editor">
                    <div className="modal-header">
                        <h3>
                            { selectedDish.is_new ? 'Create Dish' : 'Edit Dish' }
                        </h3>
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <div className="description">
                                <label htmlFor="description">Description</label>
                                <input autoFocus className="input-description" type="text" value={formDescription} onChange={event => setFormDescription(event.target.value)} />
                            </div>
                            { selectedDish.is_new || 
                                <div className="images-container">
                                    {/* Display all images that have not been queued for purge via the delete button */}
                                    { selectedDish.images.map(image => !formImagePurges[image.id] &&
                                        <div className="image-card" key={image.id}>
                                            <a href={generateImageUrl(image, 'large')} target="_blank" rel="noopener noreferrer"><img src={generateImageUrl(image, 'medium')} alt="" /></a>
                                            <i className='fas fa-trash fa-2x' onClick={e => setFormImagePurges({ ...formImagePurges, [image.id]: true})} />
                                        </div>
                                    )}
                                </div> 
                            }
                            <div className="file-selection">
                                <label htmlFor="images">Upload Images</label>
                                <input className="input-files" type="file" ref={formFileInput} multiple={true} accept="image/*"
                                    onChange={handleFileSelection}/>
                            </div>
                            {/* Display previews for images to be uploaded */}
                            { uploadPreviews.length > 0 &&
                                    <div className="image-previews-container">
                                        { uploadPreviews.map((imageURL, index) => <img src={imageURL} alt="" key={index} /> ) }
                                    </div>
                                }
                            <div className="form-tags-container">
                                { renderTags('meals') }
                                { renderTags('courses') } 
                                { renderTags('diets') }
                                { renderTags('events') }
                                { renderTags('serving style') }
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div>
                            { selectedDish.is_new || <button className="btn-main btn-delete" onClick={handleDelete}>Delete Dish</button> }
                        </div>
                        <div>
                            <button className="btn-main btn-cancel" onClick={hideModal}>
                                Cancel
                            </button>
                            <button className="btn-main btn-save" onClick={handleSubmit}>
                                { selectedDish.is_new ? 'Create Dish' : 'Save Changes' }
                            </button>
                        </div>
                    </div>
                </Modal>
        )
    }

    return (
        <div className="container dish-manager">
            <div className="actions">
                <button className="btn-main" onClick={() => setShowModal(true)}>Create New Dish</button>
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