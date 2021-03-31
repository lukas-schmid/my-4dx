import React from 'react';

export default function Loader({color}) {
    return (
        <div className={color ? `loader loader--${color}` : 'loader'}>Loading...</div>
    )
}