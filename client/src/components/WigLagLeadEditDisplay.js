import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../appContext';
// Import components
import LeadMeasureSummaryCard from '../components/LeadMeasureSummaryCard';
// Import helpers
import { deleteWig } from '../apiHelper';

export default function WigLagLeadEditDisplay({ wig, setIndex }) {
    const { getAndUpdateWigs } = useGlobalContext();

    const [currentWig, setCurrentWig] = useState({...wig});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setCurrentWig({...wig});
    }, [wig]);

    const deleteCurrentWig = async id => {
        setIsLoading(true);
        const response = await deleteWig(id);
        setIndex(0);
        getAndUpdateWigs();
    }

    useEffect(() => {
        return () => {
            setIsLoading(false);
        };
    });

    return (
        <div className="lagTracker-page__infoColumn">
            <h3 className="form-title">Team WIG</h3>
            <div className="form-section">
                <textarea 
                    cols="10"
                    rows="4"
                    className="form-control" 
                    value={currentWig.wigName}
                    readOnly
                ></textarea>
            </div>
            <button type="button" className="btn btn-danger" onClick={e => {
                deleteCurrentWig(currentWig.wigId);
            }} disabled={isLoading}>{isLoading ? 'Deleting...' : 'Delete WIG'}</button>

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
                    <label className="capitalize" htmlFor="trackingType">
                    {currentWig.lagDataType === 'money' ? `${currentWig.lagDataType} (${currentWig.lagCurrency})` : currentWig.lagDataType}
                </label>
            </div>

            <div className="form-section mt-10">
                <p className="form-section-title"><span className="form-title">Start date:</span> {currentWig.startDate}</p>
                <p className="form-section-title mt-10"><span className="form-title">End date:</span> {currentWig.endDate}</p>
            </div>

            <p className="form-section-title">Tracking Time:</p>
            <div className="form-check">
                <input type="radio" className="form-check-input" id="trackingTime" value="weekly" defaultChecked readOnly/>
                <label className="capitalize" htmlFor="trackingTime">
                    {currentWig.lagInterval}
                </label>
            </div>
            
            <h3 className="form-title mt-30">Lead Measures</h3>
            {currentWig.leadMeasures.length > 0 && currentWig.leadMeasures.map((lead, index) => {
                return <LeadMeasureSummaryCard leadMeasure={lead} key={index} index={index} wigId={currentWig.wigId}/>
            })}
        </div>
    )
}
