import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../appContext';
// Import helpers
import { deleteMember, updateMember } from '../apiHelper';

export default function CurrentMemberCard({teamMember, index}) {
    const { isLoading, setIsLoading } = useGlobalContext();

    const [adminChecked, setAdminChecked] = useState(teamMember.isAdmin);
    const [scoreBoardIncludeChecked, setScoreBoardIncludeChecked] = useState(teamMember.scoreboardInclude);

    const removeUser = (id) => {
        console.log(id);
        console.log(teamMember)
        deleteMember(teamMember.id)
        .then(data => {
            console.log(data);
           // setIsLoading(false);
        })
        .catch(err => {
           // setIsLoading(false);
            console.error(err);
        });
    }

    useEffect(() => {
        const formData = {
            email: teamMember.email,
            name: teamMember.name,
            companyName: teamMember.companyName,
            teamId: teamMember.teamId,
            teamName: teamMember.teamName,
            title: teamMember.title,
            isAdmin: adminChecked,
            scoreboardInclude: scoreBoardIncludeChecked,
        };
        console.log(formData)

        updateMember(teamMember.id, formData)
            .then(data => {
                console.log(data);
                //setIsLoading(false);
            })
            .catch(err => {
                //setIsLoading(false);
                console.error(err);
            });
    }, [adminChecked, scoreBoardIncludeChecked])

    const updateIsAdmin = () => {
        adminChecked ? setAdminChecked(false) : setAdminChecked(true)
    }

    const updateScoreboardInclude = () => {
        scoreBoardIncludeChecked ? setScoreBoardIncludeChecked(false) : setScoreBoardIncludeChecked(true)
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
                            onChange={updateIsAdmin}
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
                            onChange={updateScoreboardInclude}
                        />
                        <label className="form-check-label" htmlFor={`scoreboardInclude-${index}`}>
                            Include in scoreboard
                        </label>
                    </li>
                    <li className="member-card__listItem">
                        <button
                            className="btn btn-danger member-card__btn sending" 
                            onClick={() => removeUser(teamMember.id)}
                        >
                            Remove member
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}
