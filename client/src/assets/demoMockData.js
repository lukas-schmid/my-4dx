import { getRandomBetween } from '../helpers';


const admin = {
    email: "susan@mobstersfivestarhotel.org",
    id: "1",
    isAdmin: true,
    name: "Susan",
    scoreboardInclude: false,
    title: 'Head of Event Management',
    company: 'Mobsters Five Star Hotels'
}


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