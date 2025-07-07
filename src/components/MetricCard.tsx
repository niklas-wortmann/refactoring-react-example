export function MetricCard(props: { label: string, delta: number, icon?: string }) {
    return <div style={{border: "1px solid #ddd", padding: "20px", borderRadius: "8px"}}>
        <h3>Total Users</h3>
        <div style={{fontSize: "32px", fontWeight: "bold", color: "#2196F3"}}>
            {props.label}
        </div>
        <div
            style={{color: props.delta >= 0 ? "green" : "red"}}>
            {props.icon ?? props.delta >= 0 ? "↗" : "↘"}
            {Math.abs(props.delta).toFixed(1)}% vs last month
        </div>
    </div>;
}
