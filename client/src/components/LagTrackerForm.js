import React, { useState, useEffect } from 'react'

export default function LagTrackerForm({wig, setWigCopy}) {

    const onInputchange = e => {
        const key = e.target.name.replace(/-[0-9]+/, '');
        const index = parseInt(e.target.name[e.target.name.length - 1]);
        const newLagObj = [...wig.lagData][index]

        const newLeadData = [...wig.lagData];

        console.log(key)

        // setWigCopy({
        //     ...wig,
        //     leadData: [
        //         ...wig.leadData,

        //     ]
        // });
    }

    const handleSubmit = e => {
        e.preventDefault();
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            {wig.lagData.map((data, index) => {
                return <div key={index}>
                    <p className="form-section-title">{data.startDate}</p>
                    <div class="input-group mb-5">
                        <span class="input-group-text">Target</span>
                        <input 
                            type="text" 
                            className="form-control" 
                            name={`target-${index}`} 
                            onChange={onInputchange}
                            // value={data.target}
                        />
                    </div>
                    <div class="input-group">
                        <span class="input-group-text">Result</span>
                        <input type="text" className="form-control" name={`result-${index}`} />
                    </div>
                </div>
            })}
        </form>
    )
}
