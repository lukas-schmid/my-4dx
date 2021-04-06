import React, { useState, useEffect, useRef } from 'react';

export default function CommitmentItem({commitment, index}) {
    const [isLoading, setIsLoading] = useState(false);
    const [checked, setChecked] = useState(commitment.isCompleted)

    const updateCommitment = e => {
        setIsLoading(true);
        setChecked(!checked);
        const commitmentData = {
            isCompleted: !checked,
            commitmentName: commitment.commitmentName,
        }
        console.log(commitmentData)

        setTimeout(() => {
            setIsLoading(false);
        }, 2000)
    }

    const deleteCommitment = e => {
        setIsLoading(true);
        
        console.log('delete')

        setTimeout(() => {
            setIsLoading(false);
        }, 2000)
    }

    useEffect(() => {
        setChecked(commitment.isCompleted || false);
    }, [commitment])

    return (
        <li className="commitment-item">
            <input
                type="checkbox" 
                id={`commitment-${index}`}
                checked={checked}
                onChange={updateCommitment}
                className="form-check-input commitment-item__checkbox"
                disabled={isLoading}
            />
            <button
                // data-commitmentid={commitment.commitmentId}
                className="commitment-item__delete-btn"
                onClick={deleteCommitment}
                disabled={isLoading}
            >{isLoading ? '...' : 'X'}</button>
            <label
                className="commitment-item__text"
                htmlFor={`commitment-${index}`}
            >{commitment.commitmentName || ''}</label>
        </li>
    )
}
