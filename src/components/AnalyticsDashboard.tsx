import {useEffect, useState} from 'react';
import {MetricCard} from "./MetricCard.tsx";

type RecentActivity = { user: string, action: string, timestamp: string };

type AnalyticsData = {
    "totalUsers": number,
    "previousTotalUsers": number,
    "revenue": number,
    "previousRevenue": number,
    "pageViews": number,
    "previousPageViews": number,
    "conversionRate": number,
    "previousConversionRate": number,
    "recentActivity": RecentActivity[]
};

const AnalyticsDashboard = () => {

    const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/analytics')
            .then(response => response.json())
            .then(apiResponse => {
                setAnalyticsData(apiResponse);
                setLoading(false);
            })
            .catch(apiError => {
                setError('Failed to load analytics data');
                setLoading(false);
            });
    }, []);

    const formatNumber = (num: number) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
    };

    const calculateGrowth = (current: number, previous: number) => {
        if (previous === 0) return 0;
        return ((current - previous) / previous) * 100;
    };

    if (loading) return <div>Loading analytics...</div>;
    if (error) return <div style={{color: 'red'}}>{error}</div>;
    if (!analyticsData) return <div>No data available</div>;

    return (
        <div style={{padding: '20px', fontFamily: 'Arial, sans-serif'}}>
            <h1>Analytics Dashboard</h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
            }}>
                <MetricCard s={formatNumber(analyticsData.totalUsers)}
                            number={calculateGrowth(analyticsData.totalUsers, analyticsData.previousTotalUsers)}/>

                <MetricCard s={formatNumber(analyticsData.revenue)}
                            number={calculateGrowth(analyticsData.revenue, analyticsData.previousRevenue)}/>

                <MetricCard s={formatNumber(analyticsData.pageViews)}
                            number={calculateGrowth(analyticsData.pageViews, analyticsData.previousPageViews)}/>

                <MetricCard s={formatNumber(analyticsData.conversionRate)}
                            number={calculateGrowth(analyticsData.conversionRate, analyticsData.previousConversionRate)}/>
            </div>

            <div style={{marginTop: '40px'}}>
                <h2>Recent Activity</h2>
                <div style={{border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden'}}>
                    {analyticsData.recentActivity && analyticsData.recentActivity.map((activity: any, index: number) => (
                        <div key={index} style={{
                            padding: '15px',
                            borderBottom: index < analyticsData.recentActivity.length - 1 ? '1px solid #eee' : 'none',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div>
                                <div style={{fontWeight: 'bold'}}>{activity.user}</div>
                                <div style={{color: '#666', fontSize: '14px'}}>{activity.action}</div>
                            </div>
                            <div style={{color: '#999', fontSize: '12px'}}>
                                {formatDate(activity.timestamp)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
