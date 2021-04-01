import React from 'react';
// Import components
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';
import UserAccountForm from '../components/UserAccountForm';

export default function Account() {
    return (
        <main className="page-container">
            <section className="page-content page-split my-account-page">
                <PageHeader pageTitle="My Account"/>
                <article className="form-container">
                    <UserAccountForm />
                </article>
                <PageFooter excludeQuote={true}/>
            </section>
        </main>
    )
}
