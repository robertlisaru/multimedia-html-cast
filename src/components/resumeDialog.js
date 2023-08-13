
function secondsToHHMMSS(seconds) {
    return new Date(seconds * 1000).toISOString().slice(11, 19);
}

const ResumeDialog = ({ target, resumeTime, close }) => {
    return <div
        className="resumeDialog">

        <label className="resumeLabel">
            {"Resume from " + secondsToHHMMSS(resumeTime) + " ?"}
        </label>

        <button autoFocus
            onClick={() => {
                target.currentTime = resumeTime;
                target.play();
                close();
            }}>YES</button>

        <button onClick={() => {
            target.play();
            close();
        }}>NO</button>

    </div >;
};

export default ResumeDialog;
