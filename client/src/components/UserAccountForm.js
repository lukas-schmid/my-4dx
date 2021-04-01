import React from 'react';
import { useGlobalContext } from '../appContext';
// Import helpers
import { updateMember, sendPasswordReset, deleteMember } from '../apiHelper';
// Import components
import FormLoaderOverlay from './FormLoaderOverlay';

export default function UserAccountForm() {
    const { currentUserInfo, isLoading, setIsLoading } = useGlobalContext();

    const handleSubmit = e => {
        e.preventDefault();
        setIsLoading(true);

        const formData = {
            email: currentUserInfo.email,
            name: e.target.name.value,
            companyName: currentUserInfo.companyName,
            teamId: currentUserInfo.teamName,
            teamName: currentUserInfo.teamName,
            title: e.target.role.value,
            isAdmin: currentUserInfo.isAdmin,
            scoreboardInclude: currentUserInfo.scoreboardInclude
        };

        updateMember(currentUserInfo.id, formData)
            .then(data => {
                console.log(data);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
                console.error(err);
            });
    }

    const handlePasswordReset = () => {
        setIsLoading(true);
        const formData = {
            email: currentUserInfo.email
        };
        sendPasswordReset(formData)
            .then(data => {
                console.log(data);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
                console.error(err);
            });
    }

    const handleDeleteUser = () => {
        setIsLoading(true);
        const userId = currentUserInfo.id
        deleteMember(userId)
            .then(data => {
                console.log(data);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
                console.error(err);
            });
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
                <input readOnly type="text" className="form-control" id="email" name="email" defaultValue={currentUserInfo && currentUserInfo.email}/>
            </div>
            <h3 className="form-title mt-30 mb-10">Change Password:</h3>
            <div class="span9 btn-block">
                <button onClick={handlePasswordReset} class="btn btn-large btn-block btn-primary" type="button">Send Reset Link</button>
            </div>
            <div class="span9 btn-block">
                <button onClick={handleDeleteUser} type="button" className="btn btn-danger mt-30">Delete Account</button>
            </div>
            <button type="submit" className="btn btn-outline-primary mt-30">Update</button>
        </form>
    )
}
