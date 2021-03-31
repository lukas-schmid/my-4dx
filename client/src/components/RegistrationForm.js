import React from 'react';

export default function RegistrationForm() {
    const handleSubmit = e => {
        e.preventDefault();

        const formData = {
            email: e.target.email.value,
            password: e.target.password.value,
            adminName: e.target.adminName.value,
            companyName: e.target.company.value,
            teamName: e.target.teamName.value,
            title: e.target.adminTitle.value,
        }

        console.log(formData);

    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2 className="form-title">Team Creation Wizard</h2>
            <div className="form-section">
                <label className="form-label" htmlFor="adminName">Your Name:</label>
                <input type="text" className="form-control" id="adminName" name="adminName" required placeholder="E.g. John Watson"/>
            </div>
            <div className="form-section">
                <label className="form-label" htmlFor="adminTitle">Your Role:</label>
                <input type="text" className="form-control" id="adminTitle" name="adminTitle" placeholder="E.g. Consulting Detective"/>
            </div>
            <div className="form-section">
                <label className="form-label" htmlFor="email">Email address:</label>
                <input type="email" className="form-control" id="email" name="email" required placeholder="E.g. john.watson@consultingdetective.com"/>
                {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
            </div>
            <div className="form-section">
                <label className="form-label" htmlFor="company">Company:</label>
                <input type="text" className="form-control" id="company" name="company" placeholder="E.g. Sherlock Holmes Detective Agency"/>
            </div>
            <div className="form-section">
                <label className="form-label" htmlFor="teamName">Pick a Team Name:</label>
                <input type="text" className="form-control" id="teamName" name="teamName" required placeholder="E.g. Official Police Consultants"/>
            </div>
            <div className="form-section">
                <label htmlFor="password" className="form-label">Choose a Password:</label>
                <input type="password" className="form-control" id="password" name="password" required placeholder="E.g. MoriartyIsEvil!"/>
            </div>
            <div className="form-section">
                <label htmlFor="passwordConfirm" className="form-label">Confirm Password:</label>
                <input type="password" className="form-control" id="passwordConfirm" name="passwordConfirm" required placeholder="E.g. MoriartyIsEvil!"/>
            </div>
            <button type="submit" className="btn btn-success">Create Account</button>
        </form>
    )
}
