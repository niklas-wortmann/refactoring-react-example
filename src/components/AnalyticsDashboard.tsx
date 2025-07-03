import { useEffect, useState} from 'react';

const AnalyticsDashboard = () => {

    const [data, setData] = useState<{
        "totalUsers": number,
        "previousTotalUsers": number,
        "revenue": number,
        "previousRevenue": number,
        "pageViews": number,
        "previousPageViews": number,
        "conversionRate": number,
        "previousConversionRate": number,
        "recentActivity": {user: string, action: string, timestamp: string}[]
    } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/analytics')
            .then(response => response.json())
            .then(result => {
                setData(result);
                setLoading(false);
            })
            .catch(err => {
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
    if (!data) return <div>No data available</div>;

    return (
        <div style={{padding: '20px', fontFamily: 'Arial, sans-serif'}}>
            <h1>Analytics Dashboard</h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
            }}>
                <div style={{border: '1px solid #ddd', padding: '20px', borderRadius: '8px'}}>
                    <h3>Total Users</h3>
                    <div style={{fontSize: '32px', fontWeight: 'bold', color: '#2196F3'}}>
                        {formatNumber(data.totalUsers)}
                    </div>
                    <div
                        style={{color: calculateGrowth(data.totalUsers, data.previousTotalUsers) >= 0 ? 'green' : 'red'}}>
                        {calculateGrowth(data.totalUsers, data.previousTotalUsers) >= 0 ? '↗' : '↘'}
                        {Math.abs(calculateGrowth(data.totalUsers, data.previousTotalUsers)).toFixed(1)}% vs last month
                    </div>
                </div>

                <div style={{border: '1px solid #ddd', padding: '20px', borderRadius: '8px'}}>
                    <h3>Revenue</h3>
                    <div style={{fontSize: '32px', fontWeight: 'bold', color: '#4CAF50'}}>
                        ${formatNumber(data.revenue)}
                    </div>
                    <div style={{color: calculateGrowth(data.revenue, data.previousRevenue) >= 0 ? 'green' : 'red'}}>
                        {calculateGrowth(data.revenue, data.previousRevenue) >= 0 ? '↗' : '↘'}
                        {Math.abs(calculateGrowth(data.revenue, data.previousRevenue)).toFixed(1)}% vs last month
                    </div>
                </div>

                <div style={{border: '1px solid #ddd', padding: '20px', borderRadius: '8px'}}>
                    <h3>Page Views</h3>
                    <div style={{fontSize: '32px', fontWeight: 'bold', color: '#FF9800'}}>
                        {formatNumber(data.pageViews)}
                    </div>
                    <div
                        style={{color: calculateGrowth(data.pageViews, data.previousPageViews) >= 0 ? 'green' : 'red'}}>
                        {calculateGrowth(data.pageViews, data.previousPageViews) >= 0 ? '↗' : '↘'}
                        {Math.abs(calculateGrowth(data.pageViews, data.previousPageViews)).toFixed(1)}% vs last month
                    </div>
                </div>

                <div style={{border: '1px solid #ddd', padding: '20px', borderRadius: '8px'}}>
                    <h3>Conversion Rate</h3>
                    <div style={{fontSize: '32px', fontWeight: 'bold', color: '#9C27B0'}}>
                        {data.conversionRate.toFixed(2)}%
                    </div>
                    <div
                        style={{color: calculateGrowth(data.conversionRate, data.previousConversionRate) >= 0 ? 'green' : 'red'}}>
                        {calculateGrowth(data.conversionRate, data.previousConversionRate) >= 0 ? '↗' : '↘'}
                        {Math.abs(calculateGrowth(data.conversionRate, data.previousConversionRate)).toFixed(1)}% vs
                        last month
                    </div>
                </div>
            </div>

            <div style={{marginTop: '40px'}}>
                <h2>Recent Activity</h2>
                <div style={{border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden'}}>
                    {data.recentActivity && data.recentActivity.map((activity: any, index: number) => (
                        <div key={index} style={{
                            padding: '15px',
                            borderBottom: index < data.recentActivity.length - 1 ? '1px solid #eee' : 'none',
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
