import { useRef } from "react";

const Player = (props) => {
    const { file, closePlayer, showResumeDialog, updateProgress, playingFileProgress } = props;
    const normalizedPath = file.path.replace(/[\\/]+/g, '/');
    const vttSubtitlePath = normalizedPath.slice(0, normalizedPath.lastIndexOf(".")) + ".vtt";
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
                    updateProgress(file.path, {
                        time: currentTime,
                        ratio: currentTime / duration
                    });
                    lastSaved.current = currentTime;
                }
            }}
            onEnded={() => {
                closePlayer();
            }}
            onLoadedData={(event) => {
                var resumeTime = null;
                if (playingFileProgress) {
                    resumeTime = playingFileProgress.time;
                }
                if (resumeTime) {
                    event.target.pause();
                    showResumeDialog(file.path, event.target, resumeTime);
                }
            }}
        >
            <source src={normalizedPath}></source>
            <track src={vttSubtitlePath}
                kind="subtitles"
                label="vtt"
                default>

            </track>
        </video>
        {props.children}
    </div >;
};

export default Player;