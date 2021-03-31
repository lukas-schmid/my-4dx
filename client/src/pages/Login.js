import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../appContext';
// Components
import PageFooter from '../components/PageFooter';
import PageHeader from '../components/PageHeader';
import LoginForm from '../components/LoginForm';

export default function Login() {
    const { logInUser } = useGlobalContext();

    return (
        <main className="page-container">
            <section className="page-content page-split login-page">
                <PageHeader pageTitle="My 4DX"/>
                <article className="form-container">
                    <LoginForm />
                    <p className="form-text register-prompt">
                        Don't have a team yet? <Link to="/register" className="register-prompt__link">
                            Create your own!
                        </Link>
                    </p>
                    <hr />
                    <div className="demo-login">
                        <p className="form-text demo-login__text">Try a demo user!</p>
                        <button className="btn btn-outline-primary demo-login__btn" onClick={() => {
                            logInUser('demo-admin@my-4dx.herokuapp.com', 'passwort123');
                        }}>Team Admin</button>
                        <button className="btn btn-outline-primary demo-login__btn" onClick={() => {
                            logInUser('demo-user@my-4dx.herokuapp.com', 'passwort123');
                        }}>Team Member</button>
                    </div>
                </article>
                <PageFooter />
            </section>
        </main>
    )
}
