import React from 'react'

export default function AddLeadMeasureForm() {
    const handleSubmit = e => {
        e.preventDefault();
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            Add Lead Measure Form
        </form>
    )
}
