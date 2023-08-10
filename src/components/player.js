
const Player = ({ file, closePlayer, setWatchedFile }) => {

    const normalizedPath = file.path.replace(/[\\/]+/g, '/');
    const subtitlePath = normalizedPath.slice(0, normalizedPath.lastIndexOf(".")) + ".vtt";

    return <div
        className="player"
    >
        <video
            key={normalizedPath}
            controls
            autoPlay
            width="100%"
            height="100%"
            onEnded={() => {
                setWatchedFile(file);
                closePlayer();
            }}>
            <source src={normalizedPath}></source>
            <track src={subtitlePath}
                kind="subtitles"
                label="Subtitle found"
                default>

            </track>
        </video>
    </div >;

};

export default Player;