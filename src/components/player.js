
const Player = ({ file, closePlayer }) => {

    const slicedFilePath = file.path.slice(file.path.indexOf("/", 3));
    const mediaPath = "/media" + slicedFilePath;

    return <div
        className="player"
    >
        <video
            key={mediaPath}
            controls
            width="100%"
            height="100%">
            <source src={mediaPath}></source>

        </video>
    </div >;

};

export default Player;