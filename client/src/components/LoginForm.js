import React from 'react';

export default function LoginForm() {
    const handleSubmit = e => {
        e.preventDefault();
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2 className="form-title">Login</h2>
            <div>
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="password" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div>
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" />
            </div>
            <button type="submit" className="btn btn-success">Submit</button>
        </form>
    )
}
