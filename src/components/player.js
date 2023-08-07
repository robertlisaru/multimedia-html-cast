
const Player = ({ file, closePlayer }) => {

    const normalizedPath = file.path.replace(/[\\/]+/g, '/');
    const slicedFilePath = normalizedPath.slice(normalizedPath.indexOf("/", 3));
    const mediaPath = "/media" + slicedFilePath;
    const subtitlePath = mediaPath.slice(0, mediaPath.lastIndexOf(".")) + ".vtt";

    return <div
        className="player"
    >
        <video
            key={mediaPath}
            controls
            autoPlay
            width="100%"
            height="100%">
            <source src={mediaPath}></source>
            <track src={subtitlePath}
                kind="subtitles"
                label="Subtitle found"
                default>

            </track>
        </video>
    </div >;

};

export default Player;