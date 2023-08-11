import { useRef, useEffect } from 'react';

function secondsToHHMMSS(seconds) {
    return new Date(seconds * 1000).toISOString().slice(11, 19);
}

const ResumeDialog = ({ isOpen, target, resumeTime, close }) => {
    const dialogRef = useRef();

    useEffect(() => {
        if (isOpen) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [isOpen]);

    return <dialog
        ref={dialogRef}
        className="resumeDialog">
        <label className="resumeLabel">{"Resume from " + secondsToHHMMSS(resumeTime)}</label>
        <button onClick={() => {
            target.currentTime = resumeTime;
            target.play();
            close();
        }}>YES</button>
        <button onClick={() => {
            target.play();
            close();
        }}>NO</button>
    </dialog >;
};

export default ResumeDialog;