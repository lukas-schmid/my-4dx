import React from 'react'

export default function AddWigForm() {
    const handleSubmit = e => {
        e.preventDefault();
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
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
                    <input type="radio" className="form-check-input" name="trackingType" id="typeNumber" value="number"/>
                    <label className="form-check-label" htmlFor="typeNumber">Number</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="trackingType" id="typeMoney" value="money"/>
                    <label className="form-check-label" htmlFor="typeMoney">Money</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="trackingType" id="typePercent" value="percent"/>
                    <label className="form-check-label" htmlFor="typePercent">Percent</label>
                </div>
            </div>

            <p className="form-section-title">Tracking Time:</p>
            <div className="form-check-inline">
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="trackingTime" id="trackWeekly" value="weekly"/>
                    <label className="form-check-label" htmlFor="trackWeekly">Weekly</label>
                </div>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="trackingTime" id="trackMonthly" value="monthly"/>
                    <label className="form-check-label" htmlFor="trackMonthly">Monthly</label>
                </div>
            </div>

            <div className="form-section">
                <label className="form-label" htmlFor="startDate">Start date:</label>
                <input type="date" className="form-control" id="startDate" name="startDate" required/>
            </div>
            <div className="form-section">
                <label className="form-label" htmlFor="endDate">End date:</label>
                <input type="date" className="form-control" id="endDate" name="endDate" required/>
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

            <button type="submit" className="btn btn-primary">Add WIG</button>
        </form>
    )
}
