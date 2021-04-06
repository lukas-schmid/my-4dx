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

    // console.log(wig);

    const handleSubmit = async e => {

        e.preventDefault();
        setIsLoading(true);
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

        const response = await updateLag(wig.wigId, { lagData: newLagData });
        getAndUpdateWigs();
        setIsLoading(false);
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
            <button type="submit" className="btn btn-success" disabled={isLoading}>Submit</button>
        </form>
    )
}
