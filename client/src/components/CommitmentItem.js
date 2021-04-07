import React, { useState, useEffect, useRef } from 'react';
import { useGlobalContext } from '../appContext';
// Import helpers
import { deleteCommitment, updateCommitment } from '../apiHelper';

export default function CommitmentItem({commitment, index}) {
    const { currentUserInfo, getAndUpdateCurrentUserInfo, getAndUpdateTeamData } = useGlobalContext();

    const [isLoading, setIsLoading] = useState(false);
    const [checked, setChecked] = useState(commitment.isCompleted)

    const updateCurrentCommitment = async e => {
        setIsLoading(true);
        setChecked(!checked);
        const commitmentData = {
            isCompleted: !checked,
            commitmentName: commitment.commitmentName,
            startDate: commitment.startDate
        }
        
        const response = await updateCommitment( commitment.commitmentId, currentUserInfo.id, commitmentData );
        getAndUpdateCurrentUserInfo();
        getAndUpdateTeamData();

        setIsLoading(false);
    }

    const deleteCurrentCommitment = async e => {
        setIsLoading(true);
        
        const response = await deleteCommitment(commitment.commitmentId, currentUserInfo.id);
        getAndUpdateCurrentUserInfo();
        getAndUpdateTeamData();
    }

    useEffect(() => {
        setChecked(commitment.isCompleted || false);
    }, [commitment])

    useEffect(() => {
        return () => setIsLoading(false);
    }); 

    return (
        <li className="commitment-item">
            <input
                type="checkbox" 
                id={`commitment-${index}`}
                checked={checked}
                onChange={updateCurrentCommitment}
                className="form-check-input commitment-item__checkbox"
                disabled={isLoading}
            />
            <button
                // data-commitmentid={commitment.commitmentId}
                className="commitment-item__delete-btn"
                onClick={deleteCurrentCommitment}
                disabled={isLoading}
            >{isLoading ? '...' : 'X'}</button>
            <label
                className="commitment-item__text"
                htmlFor={`commitment-${index}`}
            >{commitment.commitmentName || ''}</label>
        </li>
    )
}
