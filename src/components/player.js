import { useRef, useState } from "react";
import SrtTrack from "./srtTrack";

const Player = ({ file, closePlayer, updateProgress, playingFileProgress, mediaDirectory }) => {
    const video = useRef(null);

    const [dialogInfo, setDialogInfo] = useState(null);
    function showDialog(filePath) {
        setDialogInfo({ filePath: filePath });
    }
    function closeDialog() {
        setDialogInfo(null);
    }
    const dialogOpen = (dialogInfo && file) && (dialogInfo.filePath === file.path);

    const normalize = (path) => {
        return path.replace(/[\\/]+/g, '/');
    }
    const normalizedPath = normalize(file.path);

    const findSubtitles = () => {
        var currentFolder = mediaDirectory;
        const pathTokens = normalizedPath.split('/');
        pathTokens.pop();

        while (pathTokens.length > 0 && currentFolder) {
            var subFolder = pathTokens.shift();
            currentFolder = currentFolder.children.filter((child) => { return (child.name == subFolder) })[0];
        }

        const subtitles =
            currentFolder.children.filter((child) => {
                return (child.extension == ".srt" ||
                    child.extension == ".vtt")
            });

        return subtitles;
    }

    const defaultSubtitleName = file.name.slice(0, file.name.lastIndexOf(".")) + ".srt";

    const loadSubtitles = () => {
        return findSubtitles().map((subtitle) => {
            return <SrtTrack
                key={subtitle.path}
                path={normalize(subtitle.path)}
                extension={subtitle.extension}
                isDefault={subtitle.name == defaultSubtitleName} />
        });
    }

    const lastSaved = useRef(0);

    return <div className="player">
        <video
            key={normalizedPath}
            ref={video}
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
                showDialog(file.path);
            }}
            onLoadedData={(event) => {
                var resumeTime = playingFileProgress?.time;
                if (resumeTime) {
                    event.target.currentTime = resumeTime;
                    event.target.play();
                }
            }}
        >
            <source src={normalizedPath}></source>
            {loadSubtitles()}

        </video>
        {dialogOpen && <div
            className="dialog">
            <label className="dialogLabel"> Watch again? </label>
            <button autoFocus
                onClick={() => {
                    video.current.currentTime = 0;
                    video.current.play();
                    closeDialog();
                }}>YES</button>
            <button onClick={() => {
                closeDialog();
            }}>NO</button>

        </div >}
    </div >;
};

export default Player;