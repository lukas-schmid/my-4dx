import React from 'react';
// Import components
import {FaTimesCircle, FaCheckCircle, FaCircle, FaAngleRight} from 'react-icons/fa';
import {BsPersonLinesFill} from 'react-icons/bs';

export default function MemberWigSummary({ teamMember }) {
    const { name, title, commitments, leadMeasures } = teamMember;

    return (
        <div className="member-wig-summary">
            
            <h3 className="form-title member-wig-summary__title"><BsPersonLinesFill /> {name} ({title})</h3>

            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col" className="break-word">Commitment(s)</th>
                        <th scope="col" className="center-text">Status</th>
                        </tr>
                    </thead>
                    {commitments.length === 0 && <tbody>
                        <tr>
                            <td>No commitments made...</td>
                            <td className="center-text"><FaCircle style={{color: 'gold'}}/></td>
                        </tr>
                    </tbody>}
                    {commitments.length > 0 && <tbody>
                        {commitments.map((commitment, index) => {
                            return <tr key={index}>
                                <td>{commitment.commitmentName}</td>
                                <td className="center-text">{commitment.isCompleted ? <FaCheckCircle style={{color: 'green'}} /> : <FaTimesCircle style={{color: 'red'}}/>}</td>
                            </tr>
                        })}
                    </tbody>}
                </table>
            </div>

            {leadMeasures.length > 0 && <div className="table-container table-striped">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" className="break-word">Lead Measures</th>
                            <th scope="col" className="center-text">Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leadMeasures.map((lead, index) => {
                            return <tr key={index}>
                                <td>{lead.leadName}</td>
                                <td className="center-text">{lead.leadData[0].data}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>}
            <hr className="member-wig-summary__underline"></hr>
        </div>
    )
}
