import { useRef } from "react";

const Player = (props) => {
    const { file, closePlayer, showResumeDialog, updateProgress } = props;
    const normalizedPath = file.path.replace(/[\\/]+/g, '/');
    const subtitlePath = normalizedPath.slice(0, normalizedPath.lastIndexOf(".")) + ".vtt";
    const lastSaved = useRef(0);

    return <div className="player">
        <video
            key={normalizedPath}
            controls
            autoPlay
            width="100%"
            height="100%"
            onTimeUpdate={(event) => {
                const currentTime = event.target.currentTime;
                const duration = event.target.duration;
                if (Math.abs(currentTime - lastSaved.current) > 5) {
                    localStorage.setItem(file.path, currentTime);
                    updateProgress(file.path, currentTime / duration);
                    console.log(currentTime);
                    lastSaved.current = currentTime;
                }
            }}
            onEnded={() => {
                closePlayer();
                localStorage.removeItem(file.path);
                updateProgress(file.path, 1);
            }}
            onLoadedData={(event) => {
                const resumeTime = localStorage.getItem(file.path);
                if (resumeTime) {
                    event.target.pause();
                    showResumeDialog(file.path, event.target, resumeTime);
                }
            }}
        >
            <source src={normalizedPath}></source>
            <track src={subtitlePath}
                kind="subtitles"
                label="Subtitle"
                default>

            </track>
        </video>
        {props.children}
    </div >;
};

export default Player;