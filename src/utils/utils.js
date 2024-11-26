export const fetchData = async (url, setter, errorMessage) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setter(data);
    } catch (error) {
        console.error(errorMessage, error);
        setter([]);
    }
};