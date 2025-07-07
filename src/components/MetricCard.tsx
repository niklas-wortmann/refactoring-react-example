export function MetricCard(props: { s: string, number: number }) {
    return <div style={{border: "1px solid #ddd", padding: "20px", borderRadius: "8px"}}>
        <h3>Total Users</h3>
        <div style={{fontSize: "32px", fontWeight: "bold", color: "#2196F3"}}>
            {props.s}
        </div>
        <div
            style={{color: props.number >= 0 ? "green" : "red"}}>
            {props.number >= 0 ? "↗" : "↘"}
            {Math.abs(props.number).toFixed(1)}% vs last month
        </div>
    </div>;
}
