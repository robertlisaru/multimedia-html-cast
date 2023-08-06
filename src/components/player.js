import './../styles/player.css';

const Player = ({ file, closePlayer }) => {

    return <div className="player"
        onClick={() => { closePlayer(); }}>
        {file.path}
    </div >;

};

export default Player;