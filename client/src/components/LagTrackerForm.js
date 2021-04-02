import React, { useState, useEffect } from 'react';
// Import components
import LagTrackerInputGroup from './LagTrackerInputGroup';

export default function LagTrackerForm({wig}) {

    const handleSubmit = e => {
        e.preventDefault();
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

        console.log(formData)
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            {wig.lagData.map((data, index) => {
                return <LagTrackerInputGroup 
                    key={index} 
                    lagDataObj={data} 
                    index={index} 
                    lagInterval={wig.lagInterval}
                    lagDataType={wig.lagDataType}
                />
            })}
            <button type="submit" className="btn btn-success">Submit</button>
        </form>
    )
}
