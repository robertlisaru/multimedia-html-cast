const Player = ({ file, closePlayer }) => {

    return <div
        className="player"
    >
        <video controls width="100%" height="100%">
            <source src={file.path}></source>

        </video>
    </div >;

};

export default Player;