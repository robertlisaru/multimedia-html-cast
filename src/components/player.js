import { useRef } from "react";
import SrtTrack from "./srtTrack";

const Player = (props) => {
    const { file, closePlayer, showResumeDialog, updateProgress, playingFileProgress, mediaDirectory } = props;

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
                closePlayer();
            }}
            onLoadedData={(event) => {
                var resumeTime = null;
                if (playingFileProgress) {
                    resumeTime = playingFileProgress.time;
                }
                if (resumeTime) {
                    event.target.pause();
                    showResumeDialog(file.path, event.target, resumeTime);
                }
            }}
        >
            <source src={normalizedPath}></source>
            {loadSubtitles()}

        </video>
        {props.children}
    </div >;
};

export default Player;