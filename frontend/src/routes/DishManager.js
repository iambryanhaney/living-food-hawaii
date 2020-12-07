import React, {useState, useEffect, useRef} from 'react'
import Modal from '../containers/Modal'
import { generateImageUrl } from '../components/ImageHandler'
import { DirectUpload } from '@rails/activestorage'
import { BASE_URL } from '../utility'

const DISH_URL = `${BASE_URL}/dishes`
const TAG_URL = `${BASE_URL}/tags`
const DIRECT_UPLOAD_URL = `${BASE_URL}/rails/active_storage/direct_uploads`

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
    const [selectedDish, setSelectedDish] = useState({ ...newDish })
    const [formDescription, setFormDescription] = useState('')
    const [formImagePurges, setFormImagePurges] = useState({})
    const formFileInput = useRef(null)
    const [formTags, setFormTags] = useState({})
    const [filterInput, setFilterInput] = useState('')
    const [isMounted, setIsMounted] = useState(true)
    const [uploadPreviews, setUploadPreviews] = useState([])

    // On mount toggle small navbar and confirm redirect, fetch dishes and tags
    useEffect(() => {
        props.setViewingGallery(true)
        props.setLoginRedirected(true)
        
        fetch(DISH_URL)
        .then(resp => resp.json())
        .then(fetchedDishes => {
            if (isMounted) setDishes(fetchedDishes)
            else console.log('Component unmounted; aborted dishes fetch')
        })
        .catch(err => console.error(err))

        fetch(TAG_URL)
        .then(resp => resp.json())
        .then(resp => {
            if (isMounted) setTags(resp) 
            else console.log('Aborted tag fetch')
        })
        .catch(err => console.error(err))

        // On unmount prevent stale callbacks and toggle large navbar
        return () => {
            setIsMounted(false)
            props.setViewingGallery(false)
        }
    }, [])

    // Reset and sort filteredDishes whenever the master dish list updates
    useEffect(() => {
        const sortedDishes = dishes.sort((a,b) => new Date(b.created_at) - new Date(a.created_at) )
        setFilteredDishes(sortedDishes.filter(dish => dish.description.toLowerCase().includes( filterInput.toLowerCase() )))
    },[dishes])

    // Update filteredDishes on change of filterInput string 
    useEffect(() => {
        setFilteredDishes(dishes.filter(dish => dish.description.toLowerCase().includes( filterInput.toLowerCase() )))
    },[filterInput])

    // Reset form elements on change of selectedDish
    useEffect(() => {
        const initialTags = {}
        selectedDish.tags.forEach(tag => initialTags[tag.id] = true)
        setFormTags({ ...initialTags })
        setFormDescription(selectedDish.description)
        setFormImagePurges({})
    }, [selectedDish])

    // Select a dish and open editor modal on click
    const handleClickDish = (event, dish) => {
        setSelectedDish(dish)
        setShowModal(true)
    }

    // Clear selected dish and upload previews on closing editor modal
    const hideModal = (event) => {
        setSelectedDish({ ...newDish })
        setUploadPreviews([])
        setShowModal(false)
    }

    // Initiate uploads, create previews and progress for images selected for upload
    const handleFileSelection = (event) => {
        // Release any previous ObjectURLs before generating new ones (avoids memory leaks)
        uploadPreviews.forEach(imageURL => URL.revokeObjectURL(imageURL))

        // Create initial state for all uploads
        // Start with progress loaded:0 and total: 1 to reflect 0% uploaded
        setUploadPreviews([ ...event.target.files ].map(file => ({ loaded: 0, total: 1, previewURL: URL.createObjectURL(file), signedId: null })))

        for(let i = 0; i < event.target.files.length; i++) {
            // Setup progress handler object for direct upload callbacks.
            // Functions are named exactly as required by Rails' DirectUpload module.
            const progressHandler = { 
                directUploadWillStoreFileWithXHR: request => {
                    request.upload.addEventListener("progress", progressHandler.updateProgress)
                },
                updateProgress: event => setUploadPreviews(prevState => prevState.map((image, index) => index === i ? ({ ...image, loaded: event.loaded, total: event.total }) : image )),
            }

            // Initiate Upload
            let upload = new DirectUpload(event.target.files[i], DIRECT_UPLOAD_URL, progressHandler)
            upload.create((error, blob) => {
                if (error) console.log('Error in upload.create()')
                // Assign blob signed ID on successful upload
                else setUploadPreviews(prevState => prevState.map((image, index) => index === i ? ({ ...image, signedId: blob.signed_id }) : image ))
            })
        }
    }

    // Send DELETE request, remove dish from master list and close editor modal
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
            const updatedDishes = [ ...dishes ]
            const removeIndex = updatedDishes.findIndex(e => e.id === Number(resp.id))
            updatedDishes.splice(removeIndex, 1)
            setDishes(updatedDishes)
            hideModal()
        })
        .catch(err => console.error(err))
    }

    // Build and submit form based on editor modal attributes
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

        // Attach image-blob signed ids to form
        uploadPreviews.forEach(image => {
            formData.append('dish[images][]', image.signedId)
        })

        // Attach tag_ids to form
        let has_tags = false
        for(const tag_id in formTags) {
            if (formTags[tag_id]) { 
                has_tags = true
                formData.append('dish[tag_ids][]', tag_id) 
            }
        }

        // Attach empty string if there are no tag_ids (forces Rails to delete any pre-existing tags)
        if (!has_tags) { formData.append('dish[tag_ids][]', '') }

        // Create new or update existing dish, close editor modal
        if (selectedDish.is_new) {
            fetch(DISH_URL, {
                method: 'POST',
                body: formData,
            })
            .then(resp => resp.json())
            .then(resp => {
                console.log("Finished fetch POST...")
                if (isMounted) {
                    // Add new dish to master list
                    setDishes([ ...dishes, resp])
                    hideModal()
                }
            })
            .catch(err => console.error(err))    
        } else {
            fetch(`${DISH_URL}/${selectedDish.id}`, {
                method: 'PATCH',
                body: formData,
            })
            .then(resp => resp.json())
            .then(resp => {
                const updatedDishes = [ ...dishes ]
                updatedDishes[dishes.findIndex(e => e.id === resp.id)] = resp
                if (isMounted) {
                    // Update existing dish in master list
                    setDishes(updatedDishes)
                    hideModal()
                }
            })
            .catch(err => console.error(err))
        }
    }

    // Render a grid-card with a fractal image layout
    const renderCard = (dish) => {
        // Calculate grid cells per side using 2^ceiling(log4(image count))
        const cellsPerSide = 2**Math.ceil( Math.log(dish.images.length || 1) / Math.log(4) )

        return (
            <div className='dish-card' key={`dish_${dish.id}`} onClick={e => handleClickDish(e, dish)} >
                <p>{dish.description}</p>
                <div className="images-container" style={{ 
                    gridTemplateColumns: `repeat(${cellsPerSide}, 1fr)`,
                    gridAutoRows: `${1 / cellsPerSide}fr` }}>
                    { dish.images.map(image =>
                        <img key={`image_${image.id}`} src={generateImageUrl(image, 'medium')} alt="" />                            
                    )}
                </div>
                <p>Created: {(new Date(dish.created_at)).toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })}</p>
            </div>
        )
    }

    // Render tags in editor modal
    const renderTags = (group) => {
        const sortTagNames = (group, nameA, nameB) => {
            // MEALS are sorted by time of day via lookup table.
            // EVENTS are sorted in a specific order (Abby's preference) via lookup table.
            // All other tags are sorted alphabetically
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
                    <div className={`form-tag active-${!!formTags[tag.id]}`} key={`tag_${tag.id}`}
                        onClick={() => setFormTags({ ...formTags, [tag.id]: !formTags[tag.id] })} >
                        #{tag.name}
                    </div>
                )}
            </div>
        )
    }

    // Render editor modal
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
                            {/* Display pre-existing images if updating */}
                            { selectedDish.is_new || 
                                <div className="images-container">
                                    {/* Display all images that have not been queued for purge via the delete button */}
                                    { selectedDish.images.map(image => !formImagePurges[image.id] &&
                                        <div className="image-card" key={image.id}>
                                            <a href={generateImageUrl(image, 'large')} target="_blank" rel="noopener noreferrer"><img src={generateImageUrl(image, 'medium')} alt="" /></a>
                                            <i className='fas fa-trash fa-2x' 
                                                onClick={e => setFormImagePurges({ ...formImagePurges, [image.id]: true})} />
                                        </div>
                                    )}
                                </div> 
                            }
                            <div className="file-selection">
                                <label htmlFor="images">Upload Images</label>
                                <input className="input-files" type="file" ref={formFileInput} multiple={true} accept="image/*"
                                    onChange={handleFileSelection}/>
                            </div>
                            {/* Display previews and progress for images to be uploaded */}
                            { uploadPreviews.length > 0 &&
                                    <div className="image-previews-container">
                                        { uploadPreviews.map((upload, index) =>
                                            <div className="image-preview-card" key={index}>
                                                <div className="upload-overlay" 
                                                    style={{ width: `${200 - Math.floor((upload.loaded / upload.total) * 200)}px` }} />
                                                {/* Show progress overlay until upload is complete */}
                                                { upload.loaded / upload.total < 1 && 
                                                <div className="upload-progress">
                                                    { Math.floor((upload.loaded / upload.total) * 100).toString().padStart(2, '\xa0') }%
                                                </div>
                                                }
                                                <img src={upload.previewURL} alt="" />
                                            </div>
                                        )}
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
                <input type="search" className="search-bar" placeholder="Filter by Name" onChange={e => setFilterInput(e.target.value)}/>
            </div>
            <div className="dishes-container">
                { (filteredDishes.length > 0 && filteredDishes.map(dish => renderCard(dish))) || 'No matching dishes.' } 
            </div>
            { renderModal() }
        </div>
    )
}