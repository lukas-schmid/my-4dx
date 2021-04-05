import React from 'react';

export default function Loader({size}) {
    return (
        <div className={size ? `loader loader--${size}` : 'loader'}>
            Loading...
        </div>
    )
}