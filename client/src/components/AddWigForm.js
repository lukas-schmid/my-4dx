import React from 'react'

export default function AddWigForm() {
    const handleSubmit = e => {
        e.preventDefault();
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            Add Wig Form
        </form>
    )
}
