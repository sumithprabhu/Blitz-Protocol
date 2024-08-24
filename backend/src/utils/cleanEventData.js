function cleanEventData(data) {
    // If data is already an object, return it directly
    if (typeof data === 'object') {
        return data;
    }

    // If data is a string, attempt to parse it
    try {
        const parsedData = JSON.parse(data);

        // Return the parsed data as an object
        return parsedData;
    } catch (error) {
        // If parsing fails, return the original string
        console.error('Failed to parse event data:', error);
        return data;
    }
}

module.exports = cleanEventData;
