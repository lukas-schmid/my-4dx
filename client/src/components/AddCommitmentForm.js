import React, { useState } from 'react';
import { useGlobalContext } from '../appContext';
// Import components
import FormLoaderOverlay from './FormLoaderOverlay';
// Import helpers
import { createCommitment } from '../apiHelper';
import { formatDate } from '../helpers';

export default function AddCommitmentForm({ currentMonday }) {
    const { currentUserInfo, getAndUpdateCurrentUserInfo, getAndUpdateTeamData } = useGlobalContext();

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState({ isError: false, message: '' });

    const handleSubmit = async e => {
        e.preventDefault()
        setIsLoading(true);
        setIsError({
            isError: false,
            message: ''
        });

        const formData = {
            commitmentName: e.target.commitmentName.value,
            startDate: formatDate(currentMonday),
        };

        try {
            const response = await createCommitment(currentUserInfo.id, formData);

            getAndUpdateCurrentUserInfo();
            getAndUpdateTeamData();

            setIsLoading(false);
            e.target.reset();
        } catch (err) {
            console.log(err);
            setIsError({
                isError: true,
                message: err.message
            });
        }
    }

    return (
        <form className="form mb-30" autocomplete="off" onSubmit={handleSubmit}>
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

            {isError.isError && <div className="alert alert-danger">
                <p>Ooops! Something went wrong:</p>
                <p className="italic">{isError.message}</p>
            </div>}

            <button type="submit" className="btn btn-success" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Add Commitment'}
            </button>
        </form>
    )
}
