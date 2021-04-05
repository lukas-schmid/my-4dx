import { getRandomBetween, addDays, getRandomPercentageBetween } from '../helpers';


const demoAdminInfo = {
    email: "susan.doe@mobstershotel.org",
    id: "1",
    isAdmin: true,
    name: "Susan Doe",
    scoreboardInclude: false,
    title: 'Head of Event Management',
    company: 'Mobsters Five Star Hotels'
}

const demoUserInfo = {
    email: "richard.doe@mobstershotel.org",
    id: "2",
    isAdmin: false,
    name: "Richard Doe",
    scoreboardInclude: true,
    title: 'Event Manager',
    company: 'Mobsters Five Star Hotels'
}

export const demoUserLeadDataMock = [
    {
        wigId: '1',
        leadId: '1',
        leadData: [
            {startDate: '2021-01-04', data: getRandomBetween(0, 5)},
            {startDate: addDays('2021-01-04', 7), data: getRandomBetween(0, 5)},
            {startDate: addDays('2021-01-04', 14), data: getRandomBetween(0, 5)},
            {startDate: addDays('2021-01-04', 21), data: getRandomBetween(0, 5)},
            {startDate: addDays('2021-01-04', 28), data: getRandomBetween(0, 5)},
            {startDate: addDays('2021-01-04', 35), data: getRandomBetween(0, 5)},
            {startDate: addDays('2021-01-04', 42), data: getRandomBetween(0, 5)},
            {startDate: addDays('2021-01-04', 49), data: getRandomBetween(0, 5)},
            {startDate: addDays('2021-01-04', 56), data: getRandomBetween(0, 5)},
            {startDate: addDays('2021-01-04', 63), data: getRandomBetween(0, 5)},
            {startDate: addDays('2021-01-04', 70), data: getRandomBetween(0, 5)},
            {startDate: addDays('2021-01-04', 77), data: getRandomBetween(0, 5)},
            {startDate: addDays('2021-01-04', 84), data: getRandomBetween(0, 5)},
            {startDate: addDays('2021-01-04', 91), data: getRandomBetween(0, 5)},
            {startDate: addDays('2021-01-04', 98), data: getRandomBetween(0, 5)},
        ]
    },
    {
        wigId: '1',
        leadId: '2',
        leadData: [
            {startDate: '2021-01-04', data: getRandomPercentageBetween(0.4, 0.9)},
            {startDate: addDays('2021-01-04', 7), data: getRandomPercentageBetween(0.3, 0.9)},
            {startDate: addDays('2021-01-04', 14), data: getRandomPercentageBetween(0.3, 0.9)},
            {startDate: addDays('2021-01-04', 21), data: getRandomPercentageBetween(0.4, 0.9)},
            {startDate: addDays('2021-01-04', 28), data: getRandomPercentageBetween(0.4, 0.9)},
            {startDate: addDays('2021-01-04', 35), data: getRandomPercentageBetween(0.4, 0.9)},
            {startDate: addDays('2021-01-04', 42), data: getRandomPercentageBetween(0.5, 0.9)},
            {startDate: addDays('2021-01-04', 49), data: getRandomPercentageBetween(0.5, 0.9)},
            {startDate: addDays('2021-01-04', 56), data: getRandomPercentageBetween(0.5, 0.9)},
            {startDate: addDays('2021-01-04', 63), data: getRandomPercentageBetween(0.6, 0.9)},
            {startDate: addDays('2021-01-04', 70), data: getRandomPercentageBetween(0.6, 0.9)},
            {startDate: addDays('2021-01-04', 77), data: getRandomPercentageBetween(0.6, 0.9)},
            {startDate: addDays('2021-01-04', 84), data: getRandomPercentageBetween(0.7, 0.9)},
            {startDate: addDays('2021-01-04', 91), data: getRandomPercentageBetween(0.7, 0.9)},
            {startDate: addDays('2021-01-04', 98), data: getRandomPercentageBetween(0.7, 0.9)},
        ]
    },
];

export const demoUserCommitmentDataMock = [

];


const commitments = [
    'Work with Kim and Karen for 20 minutes each on improving their upselling scripts for our bar package, as well as practicing their delivery.',
    'Attend the Chamber of Commerce meeting and capture at least three new corporate contacts that are not currently holding events at our hotel.',
    'Complete the final review of our new marketing materials for our premium bar package.',
    'Interview three candidates for the open position on our team and make an offer to the one that best meets our requirements.',
    'Complete face-to-face meetings with two companies that have just opened new offices downtown',
    'Create a special upsell experience for our premium bar package with the three clients that were scheduled for site visits',
    'Send a memories packet to two of my clients who held events with us last year, along with a handwritten note.',
    'Have a conversation, by phone or in person, with two of my clients who held their annual meeting with us last year but haven\'t commited for this year',
    'Contact at least five new prospective clients by the end of the day Monday and have at least one of them commit to making a site visit before the end of the week',
    'Create memory packages for five more clients from last year and send them out.'
]

const wigDataMock = [{
    wigName: 'Increase revenue from corporate events from $22 to $31 million per year by December 31st',
    wigId: '1',
    startDate: '2021-01-01',
    endDate: '2021-12-31',

    lagName: 'Total corporate event revenue',
    lagDataType: 'money',
    lagCurrency: 'USD',
    lagInterval: 'monthly',
    lagData: [
        {
            startDate: '2021-01-01',
            target: 2750000,
            actual: 2625670,
        },
        {
            startDate: '2021-02-01',
            target: 5500000,
            actual: 5437890,
        },
        {
            startDate: '2021-03-01',
            target: 8250000,
            actual: 7946750,
        },
        {
            startDate: '2021-04-01',
            target: 11000000,
            actual: 11124765,
        },
        {
            startDate: '2021-05-01',
            target: 13750000,
            actual: '',
        },
        {
            startDate: '2021-06-01',
            target: 165000000,
            actual: '',
        },
        {
            startDate: '2021-07-01',
            target: 19250000,
            actual: '',
        },
        {
            startDate: '2021-08-01',
            target: 22000000,
            actual: '',
        },
        {
            startDate: '2021-09-01',
            target: 24750000,
            actual: '',
        },
        {
            startDate: '2021-10-01',
            target: 27500000,
            actual: '',
        },
        {
            startDate: '2021-11-01',
            target: 30250000,
            actual: '',
        },
        {
            startDate: '2021-12-01',
            target: 33000000,
            actual: '',
        },
    ],

    leadMeasures: [
        {
            leadName: 'Complete two quality site visits per associate per week',
            leadId: '1',
            leadDataType: 'number',
            leadInterval: 'weekly',
            hasBenchmark: true,
            leadBenchmark: 2,
        },
        {
            leadName: 'Upsell our premium bar package to 90% of all events',
            leadId: '2',
            leadDataType: 'percent',
            leadInterval: 'weekly',
            hasBenchmark: true,
            leadBenchmark: 0.9,
        }
    ],
}]