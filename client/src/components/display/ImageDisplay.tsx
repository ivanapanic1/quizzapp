import React, { useState, useEffect } from 'react';
import {fetchImage} from "./displayAPI";

const ImageDisplay: React.FC<{ filePath: string }> = ({ filePath }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchAndDisplayImage = async () => {
            try {
                const imageBlob = await fetchImage(filePath);
                const imageUrl = URL.createObjectURL(imageBlob);
                setImageUrl(imageUrl);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchAndDisplayImage();
    }, [filePath]);

    const imageStyle = {
        maxWidth: '10rem',
        maxHeight: '7rem',
        height: 'auto',
        width: 'auto'
    };


    return (
        <div>
            {imageUrl ? <img
                style={imageStyle}
                src={imageUrl}
                alt="Uploaded" /> : <p>No image found.</p>}
        </div>
    );
};

export default ImageDisplay;