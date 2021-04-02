import React from 'react';

export default function CurrentMemberCard({teamMember, index}) {
    const removeUser = (id) => {
        console.log(id);
    }

    const updateIsAdmin = (id) => {
        console.log(id);
    }

    const updateScoreboardInclude = (id) => {
        console.log(id);
    }

    return (
        <div className="card member-card">
            <div className="card-header member-card__header">
                {teamMember.name} <span className="member-card__title">- {teamMember.title}</span>
            </div>
            <div className="card-body member-card__body">
                <ul>
                    <li className="member-card__listItem">
                        <strong>Email:</strong> {teamMember.email}
                    </li>
                    <li className="member-card__listItem">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name={`admin-${index}`}
                            id={`admin-${index}`}
                            defaultChecked={teamMember.isAdmin}
                            onChange={() => updateIsAdmin(teamMember.id)}
                        />
                        <label className="form-check-label" htmlFor={`admin-${index}`}>
                            Admin
                        </label>
                    </li>
                    <li className="member-card__listItem">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name={`scoreboardInclude-${index}`}
                            id={`scoreboardInclude-${index}`}
                            defaultChecked={teamMember.scoreboardInclude}
                            onChange={() => updateScoreboardInclude(teamMember.id)}
                        />
                        <label className="form-check-label" htmlFor={`scoreboardInclude-${index}`}>
                            Include in scoreboard
                        </label>
                    </li>
                    <li className="member-card__listItem">
                        <button
                            className="btn btn-danger member-card__btn" 
                            onClick={() => removeUser(teamMember.id)}
                        >
                            Remove Member
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}
