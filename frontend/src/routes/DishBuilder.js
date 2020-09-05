import React, { useState, useEffect, useRef, Fragment } from 'react'

const DISH_URL = 'http://localhost:3001/dishes'
const TAG_URL = 'http://localhost:3001/tags'

export default function DishBuilder (props) {
    const [formDescription, setFormDescription] = useState('')
    const [formTags, setFormTags] = useState({})
    const [tags, setTags] = useState([])
    const fileInput = useRef(null)

    useEffect(() => {
        let isMounted = true
        fetch(TAG_URL)
        .then(resp => resp.json())
        .then(tagList => {
            if (isMounted) { 
                setTags(tagList) 
            } else {
                console.log('Aborted tag fetch')
            }
        })
        .catch(err => console.error(err))
        return () => isMounted = false
    }, [])

    const handleFileChange = (event) => {
        // Upload automatically here
    }

    const handleDescriptionChange = (event) => {
        setFormDescription(event.target.value)
    }

    // const handleTagChange = (event, id) => {
    //     console.log(id)
    //     const updatedTags = [...formTags]
    //     updatedTags[id] = event.target.checked
    //     setFormTags(updatedTags)
    // }

    const handleSubmit = (event) => {
        event.preventDefault()

        // Attach images to form
        const formData = new FormData()
        for(let i = 0; i < fileInput.current.files.length; i++) {
            formData.append('dish[images][]', fileInput.current.files[i])
        }

        // Attach tag_ids to form
        for(const tag_id in formTags) {
            if (formTags[tag_id]) { formData.append('dish[tag_ids][]', tag_id) }
        }

        // Attach description to form
        formData.append('dish[description]', formDescription)
        
        
        fetch(DISH_URL, {
            method: 'POST',
            body: formData
        })
        .then(resp => resp.json())
        .then(json => console.log(json))
        .catch(err => console.error(err))
    }

    

    const renderTagGroup = (group) => {
        return (
            <>
                { group[0].toUpperCase() + group.slice(1) } <br />
                { tags.filter(tag => tag.group === group).sort((a,b) => a.name.localeCompare(b.name)).map(tag =>
                    <Fragment key={tag.id}>
                        <label htmlFor={`tag-${tag.id}`}>{tag.name}</label>
                        <input type="checkbox" key={`${tag.id}`}
                            onChange={event => setFormTags({ ...formTags, [tag.id]: event.target.checked })} />
                    </Fragment>
                )}
            </>
        )
    }

    const renderTags = () => {
        return (
            <>
                { renderTagGroup('meals') } <br />
                { renderTagGroup('courses') } <br /> 
                { renderTagGroup('diets') } <br />
                { renderTagGroup('themes') } <br />
                { renderTagGroup('events') } <br />
                { renderTagGroup('services') } <br />
            </>
        )
    }

    return (
        <div >
            <h1>Dish Builder</h1>
            <p>Build the dish...</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="description" style={{ width: '100%', textAlign: 'center', fontWeight: 'bold' }}>Description:</label>
                <input type="text" style={{ width: '100%' }} value={formDescription} placeholder="Enter a description for this dish" 
                    onChange={handleDescriptionChange} />
                <br /><br />
                <label htmlFor="images" style={{ width: '100%', textAlign: 'center', fontWeight: 'bold' }}>Images:</label> <br />
                <input type="file" ref={fileInput} multiple={true} onChange={handleFileChange} accept="image/*" /><br />
                <br />
                <label htmlFor="tags" style={{ width: '100%', textAlign: 'center', fontWeight: 'bold' }}>Tags:</label> <br />
                { renderTags() }
                <br /><br />
                <input type="submit" value="Create Dish"/>
            </form>
        </div>
    )
}
