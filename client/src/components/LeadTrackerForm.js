import React, { useState, useEffect } from 'react';

export default function LeadTrackerForm({ leadMeasures, currentMonday }) {
    const [isLoading, setIsLoading] = useState(false);
    const [leadCopy, setLeadCopy] = useState([]);

    const handleSubmit = e => {
        e.preventDefault();
        setIsLoading(true);

        const formDataArray = [];
        e.target.querySelectorAll('.lead-data-input').forEach(dataInput => {
            formDataArray.push({
                startDate: dataInput.dataset.startdate,
                data: dataInput.value,
                leadId: dataInput.dataset.lmid,
            });
        });

        console.log(formDataArray)

        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }

    useEffect(() => {
        setLeadCopy([...leadMeasures]);
    }, [leadMeasures]);

    const onInputChange = e => {
        const leadCopyState = [...leadCopy];
        const inputValue = parseFloat(e.target.value) || 0;
        const inputLeadCopyIndex = e.target.dataset.lmindex;
        leadCopyState[inputLeadCopyIndex].leadData[0].data = e.target.value;
        setLeadCopy(leadCopyState);
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2 className="form-title">Update Lead Measures</h2>

            {leadCopy.length > 0 && leadCopy.map((leadMeasure, index) => {
                return <div className="form-section" key={index}>
                    <label className="form-label" htmlFor={`data-${index}`}>{leadMeasure.leadName}</label>
                    <input 
                        type="text" 
                        className="form-control lead-data-input" 
                        id={`data-${index}`}
                        name={`data-${index}`}
                        data-lmindex={index}
                        data-startdate={currentMonday}
                        data-lmid={leadMeasure.leadId}
                        onChange={onInputChange}
                        value={leadMeasure.leadData[0].data}
                    />
                </div>
            })}

            <button className="btn btn-success">
                {isLoading ? 'Updating...' : 'Update Lead Measures'}
            </button>
        </form>
    )
}
