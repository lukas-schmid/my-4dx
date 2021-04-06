import React, { useState } from 'react';
import { useGlobalContext } from '../appContext';
// Import components
import FormLoaderOverlay from './FormLoaderOverlay';
// Import helpers
import { createCommitment } from '../apiHelper';
import { formatDate } from '../helpers';

export default function AddCommitmentForm({ currentMonday }) {
    const { currentUserInfo, setCurrentUserInfo } = useGlobalContext();

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault()
        setIsLoading(true);

        const formData = {
            commitmentName: e.target.commitmentName.value,
            startDate: formatDate(currentMonday),
        };

        const response = await createCommitment(currentUserInfo.id, formData);
        setCurrentUserInfo(response);

        setIsLoading(false);
    }

    return (
        <form className="form mb-30" onSubmit={handleSubmit}>
            {isLoading && <FormLoaderOverlay hide={true}/>}
            <div className="form-section mt-0">
                <label className="form-label" htmlFor='commitmentName'>Add new commitment here:</label>
                <input 
                        type="text" 
                        className="form-control" 
                        id='commitmentName'
                        name='commitmentName'
                        placeholder="For next week, I will..."
                />
            </div>
            <button type="submit" className="btn btn-success" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Add Commitment'}
            </button>
        </form>
    )
}
