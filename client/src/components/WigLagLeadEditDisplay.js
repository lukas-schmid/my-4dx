import React, { useState, useEffect } from 'react'
// Import components
import LeadMeasureSummaryCard from '../components/LeadMeasureSummaryCard';

export default function WigLagLeadEditDisplay({wig}) {
    const [currentWig, setCurrentWig] = useState({...wig});

    useEffect(() => {
        setCurrentWig({...wig});
    }, [wig]);

    return (
        <div className="lagTracker-page__infoColumn">
            <h3 className="form-title">Team WIG</h3>
            <div className="form-section">
                <textarea 
                    cols="10"
                    rows="5"
                    className="form-control" 
                    value={currentWig.wigName}
                    readOnly
                ></textarea>
            </div>
            <button type="button" className="btn btn-danger" onClick={e => {
                console.log(currentWig.wigId);
            }}>Delete WIG</button>

            <h3 className="form-title mt-30">Lag Measure</h3>
            <div className="form-section">
                <input 
                    type="text" 
                    className="form-control" 
                    value={currentWig.lagName}
                    readOnly
                />
            </div>

            <p className="form-section-title">Tracking Type:</p>
            <div className="form-check">
                <input type="radio" className="form-check-input" id="trackingType" value="number" defaultChecked readOnly/>
                    <label className="form-check-label" htmlFor="trackingType">
                    {wig.lagDataType === 'money' ? `${wig.lagDataType} (${wig.lagCurrency})` : wig.lagDataType}
                </label>
            </div>

            <div className="form-section mt-10">
                <p className="form-section-title"><span className="form-title">Start date:</span> {currentWig.startDate}</p>
                <p className="form-section-title mt-10"><span className="form-title">End date:</span> {currentWig.endDate}</p>
            </div>

            <p className="form-section-title">Tracking Time:</p>
            <div className="form-check">
                <input type="radio" className="form-check-input" id="trackingTime" value="weekly" defaultChecked readOnly/>
                <label className="form-check-label" htmlFor="trackingTime">
                    {wig.lagInterval}
                </label>
            </div>
            
            <h3 className="form-title mt-30">Lead Measures</h3>
            {wig.leadMeasures.map((lead, index) => {
                return <LeadMeasureSummaryCard leadMeasure={lead} key={index} index={index}/>
            })}
        </div>
    )
}
