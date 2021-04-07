import React from 'react';
import { Link } from 'react-router-dom';
// Import components
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';

export default function NotFound() {
    return (
        <main className="page-container">
            <section className="page-content not-found-page">
                <PageHeader pageTitle="Ooops! That page does not exist..."/>
                <article className="form-container">
                    <button className="btn btn-success">
                        <Link to="/">Back to Home</Link>
                    </button>
                </article>
                <PageFooter />
            </section>
        </main>
    )
}
