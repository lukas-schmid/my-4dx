import React from 'react';
import { useGlobalContext } from '../appContext';

export default function InviteUserForm() {
    const { isLoading, setIsLoading } = useGlobalContext();

    const handleSubmit = e => {
        e.preventDefault();

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-section mt-0">
                <label className="form-label" htmlFor="adminName">Name:</label>
                <input type="text" className="form-control" id="adminName" name="adminName" required placeholder="E.g. John Watson"/>
            </div>
            <div className="form-section">
                <label className="form-label" htmlFor="adminTitle">Role:</label>
                <input type="text" className="form-control" id="adminTitle" name="adminTitle" placeholder="E.g. Consulting Detective"/>
            </div>
            <div className="form-section">
                <label className="form-label" htmlFor="email">Email:</label>
                <input type="email" className="form-control" id="email" name="email" required placeholder="E.g. john.watson@consultingdetective.com"/>
                <div id="emailHelp" className="form-text">We'll never share their email with anyone else.</div>
            </div>
            <div className="form-check check-gap">
                <input type="checkbox" className="form-check-input" id="isAdmin" name="isAdmin" required/>
                <label className="form-check-label not-italic" htmlFor="isAdmin">Team admin?</label>
            </div>
            <div className="form-check check-gap">
                <input type="checkbox" className="form-check-input" id="scoreboardInclude" name="scoreboardInclude" defaultChecked/>
                <label className="form-check-label not-italic" htmlFor="scoreboardInclude">Include in scoreboard?</label>
            </div>
            <button type="sbumit" className="btn btn-success">Invite Member</button>
        </form>
    )
}
