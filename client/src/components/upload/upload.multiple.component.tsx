import React, { useState } from 'react';
import {Input} from "@mui/material";
interface ImageDisplayProps {
    onFileSelect: (file: File[]) => void;
}

const ImageDisplayMultiple: React.FC<ImageDisplayProps> = ({ onFileSelect }) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [uploadResponse, setUploadResponse] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files); // Converts to an array
            setSelectedFiles(filesArray);
            onFileSelect(filesArray); // Passes the array of files
        } else {
            setSelectedFiles([]);
            onFileSelect([]); // Passes an empty array
        }
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            alert('Please select files to upload.');
            return;
        }

        try {
            // Assuming uploadImage function handles multiple files
            // await uploadImage(selectedFiles);
            setUploadResponse('Images uploaded successfully!');
        } catch (error) {
            setUploadResponse('Failed to upload files.');
        }
    };

    return (
        <div>
            <input
                type="file"
                multiple
                onChange={handleFileChange}
            />
            {/*<button onClick={handleUpload}>Upload Images</button>*/}
            {uploadResponse && <p>{uploadResponse}</p>}
        </div>
    );
};

export default ImageDisplayMultiple;