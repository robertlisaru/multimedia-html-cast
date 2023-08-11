
const Player = (props) => {
    const { file, closePlayer, setWatchedFile, showResumeDialog } = props;
    const normalizedPath = file.path.replace(/[\\/]+/g, '/');
    const subtitlePath = normalizedPath.slice(0, normalizedPath.lastIndexOf(".")) + ".vtt";

    return <div className="player">
        <video
            key={normalizedPath}
            controls
            autoPlay
            width="100%"
            height="100%"
            onProgress={(event) => {
                const currentTime = event.target.currentTime;
                if (currentTime > 10) {
                    localStorage.setItem(file.path, currentTime);
                }
            }}
            onEnded={() => {
                setWatchedFile(file);
                closePlayer();
                localStorage.removeItem(file.path);
            }}
            onLoadedData={(event) => {
                const resumeTime = localStorage.getItem(file.path);
                if (resumeTime) {
                    event.target.pause();
                    showResumeDialog(event.target, resumeTime);
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