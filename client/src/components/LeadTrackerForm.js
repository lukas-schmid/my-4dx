import React, { useState, useEffect } from 'react';

export default function LeadTrackerForm({ leadMeasures }) {
    const [isLoading, setIsLoading] = useState(false);
    const [leadCopy, setLeadCopy] = useState([]);

    const handleSubmit = e => {
        e.preventDefault();
        setIsLoading(true);

        e.target.querySelectorAll('#leadData').forEach(dataInput => {
            console.log(dataInput.value)
        })

        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }

    useEffect(() => {
        setLeadCopy([...leadMeasures]);
    }, [leadMeasures]);

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2 className="form-title">Update Lead Measures</h2>

            {leadCopy.length > 0 && leadCopy.map((leadMeasure, index) => {
                return <div className="form-section" key={index}>
                    <label className="form-label" htmlFor={`leadData-${index}`}>{leadMeasure.leadName}</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id={`leadData`} 
                        name={`leadData-${index}`}
                        defaultValue={leadMeasure.leadData[0].data}
                    />
                </div>
            })}

            <button className="btn btn-success">
                {isLoading ? 'Updating...' : 'Update Lead Measures'}
            </button>
        </form>
    )
}
