import React, { useState } from 'react'

export default function AddCommitmentForm() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = e => {
        e.preventDefault()
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }

    return (
        <form className="form mb-30" onSubmit={handleSubmit}>
            {/* <h3 className="form-title">Add New Commitment</h3> */}
            <div className="form-section mt-0">
                <label className="form-label" htmlFor='commitmentName'>Add new commitment here:</label>
                <input 
                        type="text" 
                        className="form-control" 
                        id='commitmentName'
                        name='commitmentName'
                        placeholder="For next week, I will..."
                />
            </div>
            <button type="submit" className="btn btn-success">
                {isLoading ? 'Loading...' : 'Add Commitment'}
            </button>
        </form>
    )
}
