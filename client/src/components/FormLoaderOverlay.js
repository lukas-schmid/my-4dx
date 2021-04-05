import React from 'react';
// Import components
import Loader from './Loader';

export default function FormLoaderOverlay({size}) {
    return (
        <div className="loader-overlay">
            <Loader size={size}/>
        </div>
    )
}
