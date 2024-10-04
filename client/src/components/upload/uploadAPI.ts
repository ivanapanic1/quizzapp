export async function uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('http://localhost:8080/api/pictrue', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.filePath; // Adjust based on the response structure
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}
