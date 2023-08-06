const Player = ({ file, closePlayer }) => {

    const style = {
        position: "fixed",
        top: "auto",
        left: "auto",
        right: "auto",
        bottom: "auto",
        width: "640px",
        height: "480px",
        backgroundColor: "red"
    };

    return <div
        style={style}
        className="player"
        onClick={() => { closePlayer(); }}>
        {file.path}
    </div >;

};

export default Player;