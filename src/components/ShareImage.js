import React, { useState } from 'react';

const ShareImage = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const handleShare = () => {
        // Add your image sharing logic here
        alert('Image sharing functionality not implemented yet.');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen p-6 bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Share Your Image</h1>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mb-4 border border-gray-300 rounded p-2"
            />
            {selectedImage && (
                <div className="mb-4">
                    <img src={selectedImage} alt="Selected" className="w-64 h-64 object-cover rounded" />
                </div>
            )}
            <button
                onClick={handleShare}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
                Share Image
            </button>
        </div>
    );
};

export default ShareImage;
