
const ProgressBar = ({ value, color = "lightgreen" }) => {
    const percentage = value * 100;

    return (
        <div className="progress-container">
            <div className="progress-bar" style={{
                width: `${percentage}%`,
                backgroundColor: `${color}`
            }}>
            </div>
        </div >
    );
};

export default ProgressBar;