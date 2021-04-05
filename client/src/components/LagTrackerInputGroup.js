import React, { useState, useEffect } from 'react';
// Import components
import DateMiniHeader from './DateMiniHeader';


export default function LagTrackerInputGroup({lagDataObj, index, lagInterval, lagDataType}) {

    const [inputState, setInputState] = useState(lagDataObj);

    useEffect(() => {
        setInputState(lagDataObj);
    }, [lagDataObj]);

    const onInputchange = e => {
        setInputState({
            ...inputState,
            [e.target.name]: e.target.value
        });
    }

    return (
        <>
            <DateMiniHeader weekOrMonth={lagInterval} date={lagDataObj.startDate}/>
            <div className="input-group mb-5">
                <span className="input-group-text">Target</span>
                <input 
                    type="text" 
                    className="form-control" 
                    name="target"
                    data-index={index}
                    data-startdate={inputState.startDate}
                    onChange={onInputchange}
                    value={inputState.target}
                />
            </div>
            <div className="input-group mb-20">
                <span className="input-group-text">Result</span>
                <input 
                    type="text" 
                    className="form-control" 
                    name="actual" 
                    data-index={index}
                    data-startdate={inputState.startDate}
                    onChange={onInputchange}
                    value={inputState.actual || ''}
                />
            </div>
        </>
    )
}
