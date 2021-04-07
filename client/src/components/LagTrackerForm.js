import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../appContext';
// Import components
import LagTrackerInputGroup from './LagTrackerInputGroup';
import FormLoaderOverlay from './FormLoaderOverlay';
// Import helpers
import { updateLag } from '../apiHelper';

export default function LagTrackerForm({ wig }) {
    const { getAndUpdateWigs } = useGlobalContext();

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState({ isError: false, message: '' });
    const [showSuccess, setShowSuccess] = useState(false);

    // console.log(wig);

    const handleSubmit = async e => {
        e.preventDefault();
        setIsLoading(true);
        setShowSuccess(false);
        setIsError({
            isError: false,
            message: ''
        });

        const newLagData = [...wig.lagData];
        e.target.querySelectorAll('input').forEach(input => {
            const index = parseInt(input.dataset.index);
            const key = input.name;
            const value = input.value;
            newLagData[index][key] = value;
        });
        
        const newWig = {
            ...wig,
            lagData: newLagData
        } // formData === entire WIG object

        try {
            const response = await updateLag(wig.wigId, { lagData: newLagData });
            getAndUpdateWigs();
            setIsLoading(false);
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        } catch (err) {
            console.error(err);
            setIsError({
                isError: true,
                message: err.message
            });
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            {isLoading && <FormLoaderOverlay />}
            {wig && wig.lagData.length > 0 && wig.lagData.map((data, index) => {
                return <LagTrackerInputGroup 
                    key={index} 
                    lagDataObj={data} 
                    index={index} 
                    lagInterval={wig.lagInterval}
                    lagDataType={wig.lagDataType}
                />
            })}

            {showSuccess && <div className="alert alert-success">Lag data successfully updated!</div>}
            {isError.isError && <div className="alert alert-danger">
                <p>Ooops! Something went wrong:</p>
                <p className="italic">{isError.message}</p>
            </div>}

            <button type="submit" className="btn btn-success" disabled={isLoading}>Submit</button>
        </form>
    )
}
