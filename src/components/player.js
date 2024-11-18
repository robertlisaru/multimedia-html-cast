
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
                if (currentTime - lastSave > 10) {
                    localStorage.setItem(file.path, currentTime);
                    lastSave = currentTime;
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
                    showResumeDialog(file.path, event.target, resumeTime);
                }
            }}
            onLoadedMetadata={(event) => {
                localStorage.setItem('DURATION_OF_' + file.path, event.target.duration);
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