import React from 'react'


export default function ModalHeader({newKey = "Wowee!", testing = "Well sonofabitch!"}) {
    return (
        <div>
            {newKey}
            {testing}
        </div>
    )
}