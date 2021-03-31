import React from 'react';
// Import components
import Loader from './Loader';

export default function FormLoaderOverlay() {
    return (
        <div className="loader-overlay">
            <Loader color='blue'/>
        </div>
    )
}
