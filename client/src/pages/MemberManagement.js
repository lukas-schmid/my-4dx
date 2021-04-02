import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../appContext';
// Import components
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';
import CurrentMemberCard from '../components/CurrentMemberCard';
import InviteUserForm from '../components/InviteUserForm';
// Import helpers
import { getTeamMembers } from '../apiHelper';

export default function MemberManagement() {
    const { currentUserInfo, isLoading, setIsLoading } = useGlobalContext();
    const [teamMembers, setTeamMembers] = useState([]);

useEffect(() => {
    getTeamMembers(currentUserInfo.teamId)
            .then(data => {
                setTeamMembers(data);
                //setIsLoading(false);
            })
            .catch(err => {
                //setIsLoading(false);
                console.error(err);
            });
}, [])

    // const teamMembersMock = [
    //     {
    //         email: "goran@chfinance.org",
    //         id: "1",
    //         isAdmin: true,
    //         name: "Goran Carlsson",
    //         scoreboardInclude: false,
    //         title: "CEO",
    //     },
    //     {
    //         email: "john.watson@holmesdetectiveagency.com",
    //         id: "2",
    //         isAdmin: false,
    //         name: "John Watson",
    //         scoreboardInclude: true,
    //         title: "Assistant Consulting Detective",
    //     },
    //     {
    //         email: "sherlock.holmes@holmesdetectiveagency.com",
    //         id: "3",
    //         isAdmin: false,
    //         name: "Sherlock Holmes",
    //         scoreboardInclude: true,
    //         title: "Lead Consulting Detective",
    //     }
    // ]

    return (
        <main className="page-container member-management-page">
            <section className="page-content">
                <PageHeader pageTitle="Invite Team Members"/>
                <div className="form-container">
                    <InviteUserForm />
                </div>
                <PageFooter excludeQuote={true} />

                {/* <PageHeader pageTitle="Member Management Wizard"/>
                    <article className="member-management-page__container">
                        <div className="member-management-page__form-container">
                            <h2 className="form-title">Invite Team Members</h2>
                            <InviteUserForm />
                        </div>
                        <div className="member-management-page__list">
                            <h2 className="form-title">Current Team Members</h2>
                            {teamMembersMock.map((member, index) => {
                                return <CurrentMemberCard teamMember={member} key={index} index={index}/>
                            })}
                        </div>
                    </article>
                <PageFooter excludeQuote={true} /> */}
            </section>
            <section className="page-content">
                <PageHeader pageTitle="Current Team Members"/>
                <div className="member-management-page__list">
                    {teamMembers.map((member, index) => {
                        return <CurrentMemberCard teamMember={member} key={index} index={index}/>
                    })}
                </div>
                <PageFooter excludeQuote={true} />
            </section>
        </main>
    )
}
