import React, { useState } from 'react';
import { useGlobalContext } from '../appContext';
// Import helpers
import { getAllWigsByTeamId, createLead } from '../apiHelper';
// Import components
import FormLoaderOverlay from './FormLoaderOverlay';

export default function AddLeadMeasureForm() {
    const { wigData } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        setIsLoading(true);
        const wigId = e.target.wigSelect.value;
        const formData = {
            leadName: e.target.leadName.value,
            leadInterval: e.target.trackingTime.value,
            leadDataType: e.target.trackingType.value,
            benchmarkExists: e.target.isBenchmark.checked,
            benchmark: e.target.benchmarkValue.value,
        };

        console.log(formData, wigId);
        
        createLead(e.target.wigSelect.value, formData)
            .then(data => {
                console.log(data);
                setIsLoading(false);
                e.target.reset();
            })
            .catch(err => {
                setIsLoading(false);
                console.error(err);
            });
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            {isLoading && <FormLoaderOverlay />}
            <div className="form-section">
                <label htmlFor="wigSelect" className="form-label">Which WIG is this lag measure for?</label>
                <select className="form-select" id="wigSelect" name="wigSelect">
                {wigData.length > 0 && wigData.map((wig, index) => 
                    <option key={index} value={wig.wigId}>{wig.wigName}</option>
                )}
                </select>
            </div>

            <div className="form-section">
                <label className="form-label" htmlFor="leadName">What is your lead measure?</label>
                <input type="text" className="form-control" id="leadName" name="leadName" required placeholder="E.g. Limit out of stocks to 20 or fewer per week"/>
            </div>

            <p className="form-section-title">Tracking Type:</p>
            <div className="form-check-inline form-check-inline">
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="trackingType" id="typeNumber" value="number" required/>
                    <label className="form-check-label" htmlFor="typeNumber">Number</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="trackingType" id="typePercent" value="percent" required/>
                    <label className="form-check-label" htmlFor="typePercent">Percent</label>
                </div>
            </div>

            <p className="form-section-title">Tracking Time:</p>
            <div className="form-check-inline">
                <div className="form-check" >
                    <input type="radio" className="form-check-input" name="trackingTime" id="trackDaily" value="daily" required/>
                    <label className="form-check-label" htmlFor="trackDaily">Daily</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="trackingTime" id="trackWeekly" value="weekly" required/>
                    <label className="form-check-label" htmlFor="trackWeekly">Weekly</label>
                </div>
            </div>

            <p className="form-section-title">Benchmark:</p>
            <div className="input-group form-section no-margin">
                <div className="input-group-text">
                    <input className="form-check-input no-margin" type="checkbox" name="isBenchmark" />
                </div>
                <input type="text" className="form-control" placeholder="" name="benchmarkValue"/>
            </div>
            <div className="form-text">Leave blank and unchecked if no benchmark...</div>
            
            <p className="form-section-title">Does your chosen lead measure meet the following standards?</p>
            <div className="form-check check-gap">
                <input type="checkbox" className="form-check-input" id="check1" required/>
                <label className="form-check-label" htmlFor="check1">It is predictive of achieving the WIG</label>
            </div>
            <div className="form-check check-gap">
                <input type="checkbox" className="form-check-input" id="check2" required/>
                <label className="form-check-label" htmlFor="check2">The team can make this lead measure happen without significant dependence on another team</label>
            </div>
            <div className="form-check check-gap">
                <input type="checkbox" className="form-check-input" id="check3" required/>
                <label className="form-check-label" htmlFor="check3">It can be measured</label>
            </div>
            <div className="form-check check-gap">
                <input type="checkbox" className="form-check-input" id="check4" required/>
                <label className="form-check-label" htmlFor="check4">Results are primarily driven by the performance of the team and not the team leader</label>
            </div>

            <button type="submit" className="btn btn-primary" disabled={isLoading}>Add Lead Measure</button>
        </form>
    )
}
