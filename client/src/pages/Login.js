import React from 'react';
import { Link } from 'react-router-dom';
// Components
import PageFooter from '../components/PageFooter';
import PageHeader from '../components/PageHeader';
import LoginForm from '../components/LoginForm';

export default function Login() {
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
                </article>
                <PageFooter />
            </section>
        </main>
    )
}
