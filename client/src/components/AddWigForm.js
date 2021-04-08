import React, { useState } from 'react';
import { useGlobalContext } from '../appContext';
import { Link } from 'react-router-dom';
// Import components
import FormLoaderOverlay from './FormLoaderOverlay';
// Import helpers
import { createWig } from '../apiHelper';
// Import data
import currencyCodes from '../assets/currencyList.json';

export default function AddWigForm() {
    const { currentUserInfo, getAndUpdateWigs } = useGlobalContext();

    const [isLoading, setIsLoading] = useState(false);
    const [showCurrencyField, setShowCurrencyField] = useState(false);
    const [isError, setIsError] = useState({ isError: false, message: '' });
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        setIsLoading(true);
        setShowSuccess(false);
        setIsError({
            isError: false,
            message: ''
        });

        const formData = {
            wigName: e.target.wigName.value,
            lagName: e.target.lagName.value,
            lagDataType: e.target.trackingType.value,
            lagCurrency: e.target.lagCurrency ? e.target.lagCurrency.value : '',
            lagInterval: e.target.trackingTime.value,
            startDate: e.target.startDate.value,
            endDate: e.target.endDate.value,
            teamId: currentUserInfo.teamId
        };

        createWig(formData)
            .then(() => {
                getAndUpdateWigs();

                setIsLoading(false);
                e.target.reset();

                setShowSuccess(true);
            })
            .catch(err => {
                setIsLoading(false);
                setIsError({
                    isError: true,
                    message: err.message
                })
                console.error(err);
            });
    }

    return (
        <form className="form" autoComplete="off" onSubmit={handleSubmit}>
            {isLoading && <FormLoaderOverlay />}
            <div className="form-section">
                <label className="form-label" htmlFor="wigName ">What is your WIG?</label>
                <textarea 
                    cols="10"
                    rows="4"
                    className="form-control" 
                    id="wigName" 
                    name="wigName" 
                    required 
                    placeholder="E.g. Increase percent of annual revenue from new products from 15 percent to 21 percent by December 31st"
                ></textarea>
            </div>
            <div className="form-section">
                <label className="form-label" htmlFor="lagName">What is your lag measure?</label>
                <input type="text" className="form-control" id="lagName" name="lagName" required placeholder="E.g. Monthly Sales"/>
            </div>

            <p className="form-section-title">Tracking Type:</p>
            <div className="form-check-inline">
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="trackingType" id="typeNumber" value="number" required
                    onChange={() => setShowCurrencyField(false)}
                    />
                    <label className="form-check-label" htmlFor="typeNumber">Number</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="trackingType" id="typeMoney" value="money" required
                    onChange={() => setShowCurrencyField(true)}
                    />
                    <label className="form-check-label" htmlFor="typeMoney">Money</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="trackingType" id="typePercent" value="percent" required
                    onChange={() => setShowCurrencyField(false)}
                    />
                    <label className="form-check-label" htmlFor="typePercent">Percent</label>
                </div>
            </div>

            {showCurrencyField && <div className="form-section form-section--inline">
                <input list="currency" name="lagCurrency" id="lagCurrency" className="form-control form-control--currencyList"/>
                <label htmlFor="lagCurrency" className="form-label--italic">Select currency</label>
                <datalist id="currency">
                    <option value="USD" />
                    <option value="EUR" />
                    <option value="GBP" />
                    {currencyCodes.sort().map((code, index) => {
                        if (code === 'USD' || code === 'EUR' || code === 'GBP') return <option key={index} value="" />;
                        return <option key={index} value={code} />;
                    })}
                </datalist>
            </div>}

            <p className="form-section-title">Tracking Time:</p>
            <div className="form-check-inline">
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="trackingTime" id="trackWeekly" value="weekly" required/>
                    <label className="form-check-label" htmlFor="trackWeekly">Weekly</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="trackingTime" id="trackMonthly" value="monthly" required/>
                    <label className="form-check-label" htmlFor="trackMonthly">Monthly</label>
                </div>
            </div>

            <div className="form-section">
                <label className="form-label" htmlFor="startDate">Start date:</label>
                <input type="date" className="form-control" id="startDate" name="startDate" />
            </div>
            <div className="form-section">
                <label className="form-label" htmlFor="endDate">End date:</label>
                <input type="date" className="form-control" id="endDate" name="endDate" />
            </div>

            <p className="form-section-title">Does your chosen WIG meet the following standards?</p>
            <div className="form-check check-gap">
                <input type="checkbox" className="form-check-input" id="check1" required/>
                <label className="form-check-label" htmlFor="check1">It is aligned with (or is) our organizations overall WIG</label>
            </div>
            <div className="form-check check-gap">
                <input type="checkbox" className="form-check-input" id="check2" required/>
                <label className="form-check-label" htmlFor="check2">It is measureable</label>
            </div>
            <div className="form-check check-gap">
                <input type="checkbox" className="form-check-input" id="check3" required/>
                <label className="form-check-label" htmlFor="check3">Our team has at least 80% ownership of the result</label>
            </div>
            <div className="form-check check-gap">
                <input type="checkbox" className="form-check-input" id="check4" required/>
                <label className="form-check-label" htmlFor="check4">Results are primarily driven by the performance of the team and not the team leader</label>
            </div>
            <div className="form-check check-gap">
                <input type="checkbox" className="form-check-input" id="check5" required/>
                <label className="form-check-label" htmlFor="check5">It is a "battle that wins the war"</label>
            </div>
            <div className="form-check check-gap">
                <input type="checkbox" className="form-check-input" id="check6" required/>
                <label className="form-check-label" htmlFor="check6">It is written in the form "from X to Y by When"</label>
            </div>

            {showSuccess && <div className="alert alert-success">
                <p className="mt-0">WIG successfully created!</p>
                <button className="btn btn-success"><Link to="/setup/add-lead-measures">Add a Lead Measure</Link></button>
            </div>}
            {isError.isError && <div className="alert alert-danger">
                <p className="mt-0">Ooops! Something went wrong:</p>
                <p className="italic mt-0">{isError.message}</p>
            </div>}

            <button type="submit" className="btn btn-primary" disabled={isLoading}>Add WIG</button>
        </form>
    )
}
