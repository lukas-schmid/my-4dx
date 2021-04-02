import React, { useState } from 'react';
import { useGlobalContext } from '../appContext';
// Import components
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';
import LagTrackerForm from '../components/LagTrackerForm';
import WigLagLeadEditDisplay from '../components/WigLagLeadEditDisplay';

export default function LagTracker() {
    const { wigData } = useGlobalContext();

    const [index, setIndex] = useState(0);
    const [wigCopy, setWigCopy] = useState([...wigData]);

    return (
        <main className="page-container page-container--multi-col lagTracker-page">
            <section className="page-content">
                <PageHeader pageTitle="Lag Measure Data"/>
                    <article className="form-container">
                        {wigCopy.length > 0 && <select className="form-select lagTracker-page__select" onChange={e => setIndex(e.target.value)}>
                        {wigCopy.map((wig, index) => {
                            return <option key={index} value={index}>{wig.wigName}</option>
                        })}
                        </select>}
                        <LagTrackerForm wig={wigCopy[index]} setWigCopy={setWigCopy} />
                    </article>
                <PageFooter excludeQuote={true}/>
            </section>
            <section className="page-content">
                <PageHeader pageTitle="WIG Summary"/>
                    <article className="form-container">
                        <WigLagLeadEditDisplay wig={wigCopy[index]} />
                    </article>
                <PageFooter excludeQuote={true}/>
            </section>
        </main>
    )
}
