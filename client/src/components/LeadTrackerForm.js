import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../appContext';
// Import components
import FormLoaderOverlay from './FormLoaderOverlay';
// Import helpers
import { formatDate } from '../helpers';
import { updateUserLeadMeasure } from '../apiHelper';

export default function LeadTrackerForm({ leadMeasure, currentMonday }) {
    const { currentUserInfo, getAndUpdateTeamData, getAndUpdateCurrentUserInfo } = useGlobalContext();

    const [leadCopy, setLeadCopy] = useState(leadMeasure);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState({ isError: false, message: '' });
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        setIsLoading(true);
        setShowSuccess(false);
        setIsError({
            isError: false,
            message: ''
        });

        const formData = {
            leadData: {
                startDate: formatDate(currentMonday),
                data: leadCopy.leadData[0].data,
            },
            leadId: leadMeasure.leadId,
            wigId: leadMeasure.wigId
        }

        try {
            const response = await updateUserLeadMeasure(leadMeasure.wigId, leadMeasure.leadId, currentUserInfo.id, formData)

            getAndUpdateCurrentUserInfo();
            getAndUpdateTeamData();

            setIsLoading(false);
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
            }, 1500);
        } catch (err) {
            console.log(err);
            setIsError({
                isError: true,
                message: err.message
            });
        }
    }

    const onInputChange = e => {
        const stateCopy = {...leadCopy};
        stateCopy.leadData[0].data = e.target.value;
        setLeadCopy(stateCopy);
    }

    useEffect(() => {
        setLeadCopy(leadMeasure);
    }, [leadMeasure, currentMonday, currentUserInfo])

    return (
        <form className="form mb-20" onSubmit={handleSubmit}>
            {isLoading && <FormLoaderOverlay hide={true}/>}
            <div className={leadMeasure && leadMeasure.leadDataType === 'percent' ? 'form-section input-group mt-10' : 'form-section mt-10'} >
                <label className="form-label" htmlFor={`data-${leadMeasure.leadId}`}>{leadMeasure.leadName}</label>
                <br />
                <input 
                    type="number" 
                    className={leadMeasure.leadDataType === 'percent' ? 'form-control lead-data-input input-group-text--left' : 'form-control lead-data-input'}
                    id={`data-${leadMeasure.leadId}`}
                    name={`data-${leadMeasure.leadId}`}
                    placeholder={leadMeasure.leadDataType === 'percent' ? 'E.g. 0.67' : ''}
                    step={leadMeasure.leadDataType === 'percent' ? '0.01' : '1'}

                    onChange={onInputChange}
                    value={leadCopy.leadData[0].data}
                />
                {leadMeasure.leadDataType === 'percent' && <span className="input-group-text input-group-text--right">%</span>}
                {leadMeasure.leadDataType === 'percent' && <div className="form-text">Please format percentages as decimals...</div>} 
            </div>

            {isError.isError && <div className="alert alert-danger">
                <p>Ooops! Something went wrong:</p>
                <p className="italic">{isError.message}</p>
            </div>}

            <button type="submit"className="btn btn-success" disabled={isLoading}>
                {isLoading && 'Updating...'}
                {showSuccess && 'Success!'}
                {!isLoading && !showSuccess && 'Update'}
            </button>
        </form>
    )
}
