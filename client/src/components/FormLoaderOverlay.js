import React from 'react';
// Import components
import Loader from './Loader';

export default function FormLoaderOverlay({size, hide}) {
    return (
        <div className="loader-overlay">
            {!hide && <Loader size={size}/>}
        </div>
    )
}
