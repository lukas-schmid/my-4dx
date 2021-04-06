import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../appContext';
// Import components
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';
import LagTrackerForm from '../components/LagTrackerForm';
import WigLagLeadEditDisplay from '../components/WigLagLeadEditDisplay';

export default function LagTracker() {
    const { wigData } = useGlobalContext();

    const [index, setIndex] = useState(0);
    const [currentWig, setCurrentWig] = useState({});

    useEffect(() => {
        setCurrentWig(wigData[index]);
    }, [wigData, index]);

    return (
        <main className="page-container page-container--multi-col lagTracker-page">
            <section className="page-content">
                <PageHeader pageTitle="Lag Measure Data"/>
                    <article className="form-container">
                        {wigData.length > 0 && <select className="form-select lagTracker-page__select" onChange={e => {
                            setIndex( parseInt(e.target.value) );
                        }}>
                        {wigData.length > 0 && wigData.map((wig, index) => {
                            return <option key={index} value={index}>{wig.wigName}</option>
                        })}
                        </select>}
                        {wigData.length > 0 && <LagTrackerForm wig={wigData[index]} />}
                    </article>
                <PageFooter excludeQuote={true}/>
            </section>
            <section className="page-content">
                <PageHeader pageTitle="WIG Summary"/>
                    <article className="form-container">
                        {wigData.length > 0 && <WigLagLeadEditDisplay wig={wigData[index]} setIndex={setIndex} />} 
                    </article>
                <PageFooter excludeQuote={true}/>
            </section>
        </main>
    )
}
