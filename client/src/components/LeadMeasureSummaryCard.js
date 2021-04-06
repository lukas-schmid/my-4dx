import React, { useState } from 'react';

export default function LeadMeasureSummaryCard({leadMeasure}) {
    const [isLoading, setIsLoading] = useState(false);

    const deleteLeadMeasure = (id) => {
        setIsLoading(true);

        console.log(id);

        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }

    return (
        <div className="card member-card">
            <div className="card-header member-card__header">
                {leadMeasure.leadName}
            </div>
            <div className="card-body member-card__body">
                <ul>
                    <li className="member-card__listItem">
                        <strong>Lead type:</strong> <span className="capitalize">{leadMeasure.leadDataType} {leadMeasure.leadDataType === 'percent' && '(%)'}</span>
                    </li>
                    <li className="member-card__listItem">
                        <strong>Lead interval:</strong> <span className="capitalize">{leadMeasure.leadInterval}</span>
                    </li>
                    <li className="member-card__listItem">
                        <strong>Lead benchmark:</strong> {leadMeasure.leadBenchmark || 'none'}
                    </li>
                    <li className="member-card__listItem">
                        <button
                            className="btn btn-danger member-card__btn" 
                            onClick={() => deleteLeadMeasure(leadMeasure.leadId)}
                            disabled={isLoading}
                        >
                                {isLoading ? 'Deleting...' : 'Delete Lead Measure'}
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}
