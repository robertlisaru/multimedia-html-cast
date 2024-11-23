import './index.css';
import DirectoryView from './components/directoryView.js';
import Player from './components/player.js';
import ResumeDialog from './components/resumeDialog.js';

import { createRoot } from 'react-dom/client';
import { StrictMode, useEffect, useState } from 'react';

const App = () => {

    const [mediaDirectory, setMediaDirectory] = useState({
        "path": "./",
        "name": "loading...",
        "children": [],
        "type": "directory"
    });
    useEffect(() => {
        fetch('./media.json').then((response) => {
            response.json().then(setMediaDirectory);
        });
    }, []);

    const [playingFile, setPlayingFile] = useState(null);
    function closePlayer() { setPlayingFile(null); };

    const [resumeDialogData, setResumeDialogData] = useState(null);
    function showResumeDialog(filePath, target, resumeTime) {
        setResumeDialogData({ filePath: filePath, target: target, resumeTime: resumeTime });
    }
    function closeResumeDialog() {
        setResumeDialogData(null);
    }
    const dialogOpen = (resumeDialogData && playingFile) && (resumeDialogData.filePath === playingFile.path);

    const [progressPerMovie, setProgressPerMovie] = useState(() => {
        const savedMap = localStorage.getItem("PROGRESS_PER_MOVIE");
        return (savedMap) ? new Map(JSON.parse(savedMap)) : new Map();
    })
    const updateProgress = (key, value) => {
        const newMap = new Map(progressPerMovie);
        newMap.set(key, value);
        setProgressPerMovie(newMap);
    };
    useEffect(() => {
        const mapArray = Array.from(progressPerMovie);
        localStorage.setItem("PROGRESS_PER_MOVIE", JSON.stringify(mapArray));
    }, [progressPerMovie]);

    return (
        <div className="content">
            <div className="directoryExplorer">
                <ul>
                    <DirectoryView
                        defaultExpanded={true}
                        directory={mediaDirectory}
                        playFile={setPlayingFile}
                        playingFile={playingFile}
                        progressPerMovie={progressPerMovie}
                    ></DirectoryView>
                </ul>
            </div>
            {playingFile && <Player
                file={playingFile}
                closePlayer={closePlayer}
                showResumeDialog={showResumeDialog}
                updateProgress={updateProgress}
                playingFileProgress={progressPerMovie.get(playingFile.path)}
                mediaDirectory={mediaDirectory}
            >

                {dialogOpen && <ResumeDialog
                    target={resumeDialogData.target}
                    resumeTime={resumeDialogData.resumeTime}
                    close={closeResumeDialog}
                ></ResumeDialog>}

            </Player>}

        </div>);
};

const root = createRoot(document.getElementById('app'));
root.render(<StrictMode><App></App></StrictMode>);
