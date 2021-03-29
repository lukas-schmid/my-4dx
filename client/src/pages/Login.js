import React from 'react';
// Components
import QuoteFooter from '../components/QuoteFooter';
import PageHeader from '../components/PageHeader';
import LoginForm from '../components/LoginForm';

export default function Login() {
    return (
        <main className="page-container">
            <section className="page-content">
                <PageHeader pageTitle="My 4DX"/>
                <article className="form-container">
                    <LoginForm />
                </article>
                <QuoteFooter />
            </section>
        </main>
    )
}
