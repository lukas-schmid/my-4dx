import React, { useState } from 'react';
import { useGlobalContext } from '../appContext';

import FormLoaderOverlay from './FormLoaderOverlay';

export default function LoginForm() {
    const { logInUser } = useGlobalContext();

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        setIsLoading(true);

        const formData = {
            email: e.target.email.value,
            password: e.target.password.value,
        }
        
        logInUser(formData.email, formData.password);
    }

    return (
        <form className="form" autocomplete="off" onSubmit={handleSubmit} >
            {isLoading && <FormLoaderOverlay size="small"/>}
            <h2 className="form-title">Login</h2>
            <div className="form-section">
                <label className="form-label" htmlFor="email">Email address</label>
                <input type="email" className="form-control" id="email" name="email" required/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="form-section">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" required/>
            </div>
            <button type="submit" className="btn btn-success" disabled={isLoading}>Sign In</button>
        </form>
    )
}
