import React, { useState } from 'react';
import {Input} from "@mui/material";
interface ImageDisplayProps {
    onFileSelect: (file: File|null) => void;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ onFileSelect }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadResponse, setUploadResponse] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            onFileSelect(event.target.files[0]); // Pass the file directly
        } else {
            onFileSelect(null); // Handle no file selected
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file to upload.');
            return;
        }

        try {
            // Assuming uploadImage function exists in API
            // const filePath = await uploadImage(selectedFile);
            setUploadResponse('Image uploaded successfully!');
        } catch (error) {
            setUploadResponse('Failed to upload file.');
        }
    };

    return (
        <div>
            <Input type="file" onChange={handleFileChange} />
            {/*<button onClick={handleUpload}>Upload Image</button>*/}
            {uploadResponse && <p>{uploadResponse}</p>}
        </div>
    );
};

export default ImageDisplay;