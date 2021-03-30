import React from 'react';
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
                    <hr />
                    <div className="demo-login">
                        <p className="form-text demo-login__text">Try a demo user!</p>
                        <button className="btn btn-primary demo-login__btn">Team Admin</button>
                        <button className="btn btn-primary demo-login__btn">Team Member</button>
                    </div>
                </article>
                <PageFooter />
            </section>
        </main>
    )
}
