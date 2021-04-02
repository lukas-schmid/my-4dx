import React from 'react';
import { useGlobalContext } from '../appContext';
// Import components
import FormLoaderOverlay from './FormLoaderOverlay';

export default function UserAccountForm() {
    const { currentUserInfo, isLoading, setIsLoading } = useGlobalContext();

    const handleSubmit = e => {
        e.preventDefault();
        setIsLoading(true);
        
        setTimeout(() => {
            setIsLoading(false);
        }, 3000)
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            {isLoading && <FormLoaderOverlay />}
            <div className="form-section mt-0">
                <label className="form-label form-title" htmlFor="name">Name:</label>
                <input type="text" className="form-control" id="name" name="name" defaultValue={currentUserInfo && currentUserInfo.name}/>
            </div>
            <div className="form-section">
                <label className="form-label form-title" htmlFor="role">Role:</label>
                <input type="text" className="form-control" id="role" name="role" defaultValue={currentUserInfo && currentUserInfo.title}/>
            </div>
            <div className="form-section">
                <label className="form-label form-title" htmlFor="email">Email:</label>
                <input type="email" className="form-control" id="email" name="email" defaultValue={currentUserInfo && currentUserInfo.email} disabled/>
            </div>
            <h3 className="form-title mt-30 mb-10">Change Password:</h3>
            <div className="form-sectio mt-0">
                <input type="password" className="form-control mb-10" id="currentPassword" name="currentPassword" placeholder="Enter current password"/>
                <input type="password" className="form-control" id="newPassword" name="newPassword" placeholder="Enter new password"/>
            </div>
            <button type="submit" className="btn btn-outline-primary mt-30">Update</button>
        </form>
    )
}
