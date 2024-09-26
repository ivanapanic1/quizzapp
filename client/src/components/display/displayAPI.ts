export async function fetchImage(filePath: string): Promise<Blob> {
    try {
        const response = await fetch(`http://localhost:8080/api/pictrue/${encodeURIComponent(filePath)}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.blob();
    } catch (error) {
        console.error('Error fetching image:', error);
        throw error;
    }
}