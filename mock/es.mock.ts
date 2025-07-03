import {MockHandler} from "vite-plugin-mock-server";

const mocks: MockHandler[] = [
    {
        pattern: '/api/analytics',
        handle: (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                "totalUsers": 15420,
                "previousTotalUsers": 14250,
                "revenue": 89750,
                "previousRevenue": 82100,
                "pageViews": 245680,
                "previousPageViews": 230120,
                "conversionRate": 3.24,
                "previousConversionRate": 3.18,
                "recentActivity": [
                    {
                        "user": "john.doe@company.com",
                        "action": "Completed purchase of Premium Plan",
                        "timestamp": "2024-12-15T14:32:00Z"
                    },
                    {
                        "user": "sarah.wilson@startup.io",
                        "action": "Started free trial",
                        "timestamp": "2024-12-15T13:45:00Z"
                    },
                    {
                        "user": "mike.chen@techcorp.com",
                        "action": "Upgraded to Enterprise",
                        "timestamp": "2024-12-15T12:20:00Z"
                    },
                    {
                        "user": "emma.taylor@agency.co",
                        "action": "Downloaded whitepaper",
                        "timestamp": "2024-12-15T11:15:00Z"
                    }
                ]
            }))
        }
    }
]

export default mocks
