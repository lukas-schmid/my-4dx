export const teamMembersMock = [
    {
        email: "goran@chfinance.org",
        id: "1",
        isAdmin: true,
        name: "Goran Carlsson",
        scoreboardInclude: false,
        title: "CEO",
    },
    {
        email: "john.watson@holmesdetectiveagency.com",
        id: "2",
        isAdmin: false,
        name: "John Watson",
        scoreboardInclude: true,
        title: "Assistant Consulting Detective",
    },
    {
        email: "sherlock.holmes@holmesdetectiveagency.com",
        id: "3",
        isAdmin: false,
        name: "Sherlock Holmes",
        scoreboardInclude: true,
        title: "Lead Consulting Detective",
    }
];

export const wigDataMock = [
    {
        wigName: 'Increase product X safety score from 50% to 90% by submission deadline on Apr 18th',
        wigId: '1',
        startDate: '2021-03-22',
        endDate: '2021-04-18',

        lagName: 'Product Safety Score',
        lagDataType: 'percent',
        lagCurrency: null,
        lagInterval: 'weekly',
        lagData: [
            {
                startDate: '2021-03-22',
                target: 0.6,
                actual: 0.58
            },
            {
                startDate: '2021-03-29',
                target: 0.7,
                actual: 0.69
            },
            {
                startDate: '2021-04-05',
                target: 0.8,
                actual: ''
            },
            {
                startDate: '2021-04-12',
                target: 0.9,
                actual: ''
            }
        ],
        leadMeasures: [
            {
                leadName: 'Safety checklist review before every deploy',
                leadId: '1',
                leadDataType: 'percent',
                leadInterval: 'weekly',
                hasBenchmark: true,
                leadBenchmark: 0.9,
            }
        ],
    },
    {
        wigName: 'Increase monthly sales from new products from 300K to 600K by June 30th',
        wigId: '2',
        startDate: '2021-01-01',
        endDate: '2021-06-30',

        lagName: 'Monthly sales of new products',
        lagDataType: 'money',
        lagCurrency: 'SEK',
        lagInterval: 'monthly',
        lagData: [
            {
                startDate: '2021-01-01',
                target: 350000,
                actual: 362293
            },
            {
                startDate: '2021-02-01',
                target: 300000,
                actual: 293879
            },
            {
                startDate: '2021-03-01',
                target: 400000,
                actual: 378657
            },
            {
                startDate: '2021-04-01',
                target: 475000,
                actual: null
            }
            ,
            {
                startDate: '2021-05-01',
                target: 550000,
                actual: null
            }
            ,
            {
                startDate: '2021-06-01',
                target: 600000,
                actual: null
            }
        ],
        leadMeasures: [
            {
                leadName: 'Make 10 cold calls per day',
                leadId: '1',
                leadDataType: 'number',
                leadInterval:'daily',
                hasBenchmark: true,
                leadBenchmark: 10,
            },
            {
                leadName: 'Follow up on 100% of all requests within 24 hours',
                leadId: '2',
                leadDataType: 'percent',
                leadInterval:'weekly',
                hasBenchmark: true,
                leadBenchmark: 1,
            }
        ],
    },
];