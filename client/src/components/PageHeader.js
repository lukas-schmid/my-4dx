import React from 'react';

export default function PageHeader({ pageTitle }) {
    return (
        <div className="page-header">
            <h2 className="page-header__heading">{pageTitle}</h2>
        </div>
    )
}
