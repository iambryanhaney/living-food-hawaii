/* eslint-disable */

import React, { useState, useEffect } from 'react'

export default function Modal(props) {
    // // Function to open modal
    // in timeout...
    //         // modalContent.style.opacity = '1';
    //         // modalContent.style.transform = 'scale(1,1)';
    // }

    // function closeModal() {
    //     modalContent.style.opacity = '0';
    //     modalContent.style.transform = 'scale(0,0)';
    // }
    console.log('In Modal Content...')
    console.log(props)

    return (
        <>
            <div className="modal-header">
                <h3 style={{ width: '100%', textAlign: 'center', fontWeight: 'bold' }}>
                    Login
                </h3>
            </div>
            <div className="modal-body">
                <form onSubmit={handleSubmit}>
                    <div style={{ width: '75%', margin: 'auto' }}>
                        <label htmlFor="email" style={{ width: '100%', textAlign: 'center', fontWeight: 'bold', display: 'inline', marginRight: '10px' }}>Email</label>
                        <input type="text" name="email" id="email" style={{ width: '75%', marginBottom: '1rem', display: 'inline' }} 
                            placeholder="Enter a valid email address" onChange={event => setFormEmail(event.target.value)}/>
                    </div>
                    
                    <div style={{ width: '75%', margin: 'auto' }}>
                        <label htmlFor="password" style={{ width: '100%', textAlign: 'center', fontWeight: 'bold', display: 'inline', marginRight: '10px' }}>Password</label>
                        <input type="password" name="password" id="password" style={{ width: '75%', marginBottom: '1rem', display: 'inline' }}
                            placeholder="Enter a password" onChange={event => setFormPassword(event.target.value)}/>

                        <input type="submit" value="Submit" hidden/>
                    </div>
                </form>
            </div>
        </>
    )
}

/*

<Modal.Header>
    <h3 style={{ width: '100%', textAlign: 'center', fontWeight: 'bold' }}>
        Login
    </h3>
</Modal.Header>
<Modal.Body>
    <form onSubmit={handleSubmit}>
        <div style={{ width: '75%', margin: 'auto' }}>
            <label htmlFor="email" style={{ width: '100%', textAlign: 'center', fontWeight: 'bold', display: 'inline', marginRight: '10px' }}>Email</label>
            <input type="text" name="email" id="email" style={{ width: '75%', marginBottom: '1rem', display: 'inline' }} 
                placeholder="Enter a valid email address" onChange={event => setFormEmail(event.target.value)}/>
        </div>
        
        <div style={{ width: '75%', margin: 'auto' }}>
            <label htmlFor="password" style={{ width: '100%', textAlign: 'center', fontWeight: 'bold', display: 'inline', marginRight: '10px' }}>Password</label>
            <input type="password" name="password" id="password" style={{ width: '75%', marginBottom: '1rem', display: 'inline' }}
                placeholder="Enter a password" onChange={event => setFormPassword(event.target.value)}/>

            <input type="submit" value="Submit" hidden/>
        </div>
    </form>
</Modal.Body>

*/
