
const Player = (props) => {
    const { file, closePlayer, setWatchedFile, showResumeDialog } = props;
    const normalizedPath = file.path.replace(/[\\/]+/g, '/');
    const subtitlePath = normalizedPath.slice(0, normalizedPath.lastIndexOf(".")) + ".vtt";
    var lastSave = 0;

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
                if (currentTime - lastSave > 10) {
                    localStorage.setItem(file.path, currentTime);
                    localStorage.setItem("PROGRESS_OF_" + file.path, currentTime / duration);
                    lastSave = currentTime;
                }
            }}
            onEnded={() => {
                setWatchedFile(file);
                closePlayer();
                localStorage.removeItem(file.path);
                localStorage.setItem("PROGRESS_OF_" + file.path, 1);
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