
const ProgressBar = ({value}) => {
    const percentage = value * 100;

    return (
        <div className="progress-container">
            <div className="progress-bar" style={{ width: `${percentage}%` }}>
            </div>
        </div>
    );
};

export default ProgressBar;