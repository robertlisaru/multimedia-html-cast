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
    const [playingFile, setPlayingFile] = useState(null);
    const [watchedFiles, setWatchedFiles] = useState(() => {
        const storedItem = localStorage.getItem("WATCHED_FILES");
        return (storedItem ? JSON.parse(storedItem) : []);
    });
    const [resumeDialogData, setResumeDialogData] = useState(null);

    useEffect(() => {
        fetch('./media.json').then((response) => {
            response.json().then(setMediaDirectory);
        });
    }, []);

    useEffect(() => {
        localStorage.setItem("WATCHED_FILES", JSON.stringify(watchedFiles));
    }, [watchedFiles]);

    function closePlayer() { setPlayingFile(null); };

    function setWatchedFile(file) {
        if (!watchedFiles.includes(file.path)) {
            setWatchedFiles((_watchedFiles) => {
                return [..._watchedFiles, file.path];
            });
        }

    }

    function showResumeDialog(filePath, target, resumeTime) {
        setResumeDialogData({ filePath: filePath, target: target, resumeTime: resumeTime });
    }

    function closeResumeDialog() {
        setResumeDialogData(null);
    }

    const dialogOpen = (resumeDialogData && playingFile) && (resumeDialogData.filePath === playingFile.path);

    return (
        <div className="content">
            <div className="directoryExplorer">
                <ul>
                    <DirectoryView
                        defaultExpanded={true}
                        directory={mediaDirectory}
                        playFile={setPlayingFile}
                        playingFile={playingFile}
                        watchedFiles={watchedFiles}
                    ></DirectoryView>
                </ul>
            </div>
            {playingFile && <Player
                file={playingFile}
                closePlayer={closePlayer}
                setWatchedFile={setWatchedFile}
                showResumeDialog={showResumeDialog}>

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
