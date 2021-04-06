import React, { useState, useEffect } from 'react';
// Import components
import FormLoaderOverlay from './FormLoaderOverlay';

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
            {isLoading && <FormLoaderOverlay size="small"/>}
            <h2 className="form-title">Update Lead Measures</h2>

            {leadCopy.length > 0 && leadCopy.map((leadMeasure, index) => {
                return <div className={leadMeasure.leadDataType === 'percent' ? 'form-section input-group' : 'form-section'} key={index}>
                    <label className="form-label" htmlFor={`data-${index}`}>{leadMeasure.leadName}</label>
                    <input 
                        type="number" 
                        className={leadMeasure.leadDataType === 'percent' ? 'form-control lead-data-input input-group-text--left' : 'form-control lead-data-input'}
                        id={`data-${index}`}
                        name={`data-${index}`}
                        data-lmindex={index}
                        data-startdate={currentMonday}
                        data-lmid={leadMeasure.leadId}
                        onChange={onInputChange}
                        value={leadMeasure.leadData[0].data}
                        placeholder={leadMeasure.leadDataType === 'percent' ? 'E.g. 0.67' : ''}
                        step={leadMeasure.leadDataType === 'percent' ? '0.01' : '1'}
                    />
                    {leadMeasure.leadDataType === 'percent' && <span className="input-group-text input-group-text--right">%</span>}
                    {leadMeasure.leadDataType === 'percent' && <div className="form-text">Please format percentages as decimals...</div>} 
                </div>
            })}

            <button className="btn btn-success">
                {isLoading ? 'Updating...' : 'Update Lead Measures'}
            </button>
        </form>
    )
}
