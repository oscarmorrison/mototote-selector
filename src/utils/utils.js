const getBaseUrl = () => {
    if (typeof window !== 'undefined' && window.MOTOTOTE_CONFIG?.baseUrl) {
        return window.MOTOTOTE_CONFIG.baseUrl
    }

    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        return '/mototote-selector/'
    }

    return 'https://oscarmorrison.com/mototote-selector/'
}

const resolveUrl = (relativePath) => {
    const baseUrl = getBaseUrl()
    const cleanPath = relativePath.startsWith('./') ? relativePath.slice(2) : relativePath
    return baseUrl + cleanPath
}

export const fetchData = async (url, setter, errorMessage) => {
    try {
        const resolvedUrl = resolveUrl(url)
        const response = await fetch(resolvedUrl)
        if (!response.ok) throw new Error(`Network response was not ok: ${response.status}`)
        const data = await response.json()
        setter(data)
    } catch (error) {
        console.error(errorMessage, error)
        setter([])
    }
}