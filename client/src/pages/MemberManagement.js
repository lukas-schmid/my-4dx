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
    const { currentUserInfo, isLoading, setIsLoading, teamData } = useGlobalContext();

    return (
        <main className="page-container page-container--multi-col member-management-page">
            <section className="page-content">
                <PageHeader pageTitle="Invite Team Members"/>
                <div className="form-container">
                    <InviteUserForm />
                </div>
                <PageFooter excludeQuote={true} />
            </section>
            <section className="page-content">
                <PageHeader pageTitle="Current Team Members"/>
                <div className="member-management-page__list">
                    {teamData.length > 0 && teamData.map((member, index) => {
                        return <CurrentMemberCard teamMember={member} key={index} index={index}/>
                    })}
                </div>
                <PageFooter excludeQuote={true} />
            </section>
        </main>
    )
}
