import React, { Component } from 'react'

const DISH_URL = 'http://localhost:3001/dishes'

export default class TestingUploads extends Component {

    constructor() {
        super()

        this.state = {
            value: ''
        }

        this.fileInput = React.createRef()
    }



    handleUpload = (event) => {


        const formData = new FormData()
        for(let i = 0; i < this.fileInput.current.files.length; i++) {
            formData.append('images[]', this.fileInput.current.files[i])
        }
        console.log(formData.getAll('images[]'))
        
        // formData.append('file', this.fileInput.current.files[0])

        fetch(DISH_URL, {
            method: 'POST',
            body: formData
        })
        .then(resp => resp.json())
        .then(json => console.log(json))
        .catch(err => console.error(err))
    }

    handleFileChange = (event) => {
        console.log(this.testArray)
        // console.log(event.target.files[0])
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        alert(`Name: ${this.state.value}\n\nFile: ${this.fileInput.current.files[0].name}`)
    }

    render() {
        return (
            <div >
                <h1>Testing Uploads...</h1>
                <p className='indented-paragraph'>
                    I hope this works?
                </p>
                <br/><br/>
                <form onSubmit={this.handleSubmit}>
                    <label>Name:</label>
                    <input type="text" value={this.state.value} onChange={this.handleChange} /><br />
                    <input type="file" ref={this.fileInput} multiple={true} onChange={this.handleFileChange} accept="image/*" /><br />
                    <button type="Button" onClick={this.handleUpload}>Upload</button>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}
