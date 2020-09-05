

function generateImageUrl(image, size='large') {
    const sizes = {
        small: 80,
        medium: 400,
    }

    const request = {
        bucket: image.bucket,
        key: image.key,
    }

    if (size !== 'large') {
        request.edits = {
            resize: {
                width: sizes[size],
            }
        }
    }

    const requestB64 = btoa(JSON.stringify(request))

    return `${image.base_url}/${requestB64}`
}

export {
    generateImageUrl
}