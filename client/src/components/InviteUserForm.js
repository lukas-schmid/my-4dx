import React, { useState } from 'react';
import { useGlobalContext } from '../appContext';
// Import components
import FormLoaderOverlay from './FormLoaderOverlay';
// Import helpers
import { addMember } from '../apiHelper';

export default function InviteUserForm() {
    const { currentUserInfo, getAndUpdateTeamData } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        setIsLoading(true);

        const formData = {
            email: e.target.email.value,
            password: "initPassword123",
            name: e.target.name.value,
            companyName: currentUserInfo.companyName,
            teamId: currentUserInfo.teamId,
            teamName: currentUserInfo.teamName,
            title: e.target.role.value,
            isAdmin: e.target.isAdmin.checked,
            scoreboardInclude: e.target.scoreboardInclude.checked
        };

        try {
            const response = await addMember(formData);
            const teamResponse = await getAndUpdateTeamData();
            setIsLoading(false);
            e.target.reset();
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            {isLoading && <FormLoaderOverlay size="medium"/>}
            <div className="form-section mt-0">
                <label className="form-label" htmlFor="name">Name:</label>
                <input type="text" className="form-control" id="name" name="name" required placeholder="E.g. John Watson"/>
            </div>
            <div className="form-section">
                <label className="form-label" htmlFor="role">Role:</label>
                <input type="text" className="form-control" id="role" name="role" placeholder="E.g. Consulting Detective"/>
            </div>
            <div className="form-section">
                <label className="form-label" htmlFor="email">Email:</label>
                <input type="email" className="form-control" id="email" name="email" required placeholder="E.g. john.watson@consultingdetective.com"/>
                <div id="emailHelp" className="form-text">We'll never share their email with anyone else.</div>
            </div>
            <div className="form-check check-gap">
                <input type="checkbox" className="form-check-input" id="isAdmin" name="isAdmin"/>
                <label className="form-check-label not-italic" htmlFor="isAdmin">Team admin?</label>
            </div>
            <div className="form-check check-gap">
                <input type="checkbox" className="form-check-input" id="scoreboardInclude" name="scoreboardInclude" defaultChecked/>
                <label className="form-check-label not-italic" htmlFor="scoreboardInclude">Include in scoreboard?</label>
            </div>
            <button type="sbumit" className="btn btn-success" disabled={isLoading}>Invite Member</button>
        </form>
    )
}
