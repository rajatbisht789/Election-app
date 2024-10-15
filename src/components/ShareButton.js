import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const ShareButton = ({ text }) => {
    const [copied, setCopied] = useState(false);

    const handleShare = () => {
        setCopied(true);
        alert('Text copied to clipboard! You can now share it on WhatsApp.');
    };

    const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;

    return (
        <div className="w-full flex flex-col items-center">
            {/* Copy to Clipboard Button */}
            <CopyToClipboard text={text} onCopy={handleShare}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 w-full max-w-xs">
                    Share
                </button>
            </CopyToClipboard>

            {/* WhatsApp Share Button (only shown after copying) */}
            {copied && (
                <a
                    href={whatsappShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200 w-full max-w-xs text-center"
                >
                    Share on WhatsApp
                </a>
            )}
        </div>
    );
};

export default ShareButton;
