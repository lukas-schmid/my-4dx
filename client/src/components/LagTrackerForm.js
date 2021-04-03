import React, { useState, useEffect } from 'react';
// Import components
import LagTrackerInputGroup from './LagTrackerInputGroup';
import FormLoaderOverlay from './FormLoaderOverlay';

export default function LagTrackerForm({wig}) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        setIsLoading(true);
        const newLagData = [...wig.lagData];
        e.target.querySelectorAll('input').forEach(input => {
            const index = parseInt(input.dataset.index);
            const key = input.name;
            const value = input.value;
            newLagData[index][key] = value;
        });
        
        const formData = {
            ...wig,
            lagData: newLagData
        } // formData === entire WIG object

        console.log(formData);
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            {isLoading && <FormLoaderOverlay />}
            {wig.lagData.length > 0 && wig.lagData.map((data, index) => {
                return <LagTrackerInputGroup 
                    key={index} 
                    lagDataObj={data} 
                    index={index} 
                    lagInterval={wig.lagInterval}
                    lagDataType={wig.lagDataType}
                />
            })}
            <button type="submit" className="btn btn-success" disabled={isLoading}>Submit</button>
        </form>
    )
}
