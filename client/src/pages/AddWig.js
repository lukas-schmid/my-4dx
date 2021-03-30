import React from 'react';
// Components
import PageFooter from '../components/PageFooter';
import PageHeader from '../components/PageHeader';
import AddWigForm from '../components/AddWigForm';

export default function AddWig() {
    return (
        <main className="page-container">
            <section className="page-content add-wig-page">
                <PageHeader pageTitle="WIG Creation Wizard"/>
                <article className="form-container">
                    <AddWigForm />
                </article>
                <PageFooter nonRandomQuote={{
                    quote: "If every other area of our operation remained at its current level of performance, what is the one area where change would have the greatest impact?",
                    by: null,
                }}/>
            </section>
        </main>
    )
}
