import React from 'react';
import { Link } from 'react-router-dom';
// Components
import PageFooter from '../components/PageFooter';
import PageHeader from '../components/PageHeader';
import RegistrationForm from '../components/RegistrationForm';

export default function Registration() {
    return (
        <main className="page-container">
            <section className="page-content page-split registration-page">
                <PageHeader pageTitle="My 4DX"/>
                <article className="form-container">
                    <RegistrationForm />
                    <p className="form-text register-prompt">
                        Already have an account? <Link to="/login" className="register-prompt__link">
                            Log In!
                        </Link>
                    </p>
                </article>
                <PageFooter />
            </section>
        </main>
    )
}
