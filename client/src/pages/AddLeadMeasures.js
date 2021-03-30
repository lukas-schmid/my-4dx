import React from 'react';
// Components
import PageFooter from '../components/PageFooter';
import PageHeader from '../components/PageHeader';
import AddLeadMeasureForm from '../components/AddLeadMeasureForm';

export default function AddWig() {
    return (
        <main className="page-container">
            <section className="page-content add-wig-page">
                <PageHeader pageTitle="Lead Measure Creation Wizard"/>
                <article className="form-container">
                    <AddLeadMeasureForm />
                </article>
                <PageFooter nonRandomQuote={{
                    quote: "What could we do that we've never done before that might make all the difference to the WIG?",
                    by: null,
                }}/>
            </section>
        </main>
    )
}
