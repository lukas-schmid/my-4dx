import React, { useState, useEffect, useRef } from 'react';

export default function CommitmentItem({commitment, index}) {
    const [isLoading, setIsLoading] = useState(false);
    const [checked, setChecked] = useState(commitment.isCompleted)

    const updateCommitment = e => {
        setChecked(!checked);
        const commitmentData = {

        }
    }

    const deleteCommitment = e => {
        console.log('delete')
    }

    useEffect(() => {
        setChecked(commitment.isCompleted);
    }, [commitment])

    return (
        <li className="commitment-item">
            <input
                type="checkbox" 
                id={`commitment-${index}`}
                checked={checked}
                onChange={updateCommitment}
                className="form-check-input commitment-item__checkbox"
            />
            <button
                // data-commitmentid={commitment.commitmentId}
                className="commitment-item__delete-btn"
                onClick={deleteCommitment}
            >X</button>
            <label
                className="commitment-item__text"
                htmlFor={`commitment-${index}`}
            >{commitment.commitmentName}</label>
        </li>
    )
}
