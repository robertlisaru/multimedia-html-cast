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
    const [expandedDirectories, setExpandedDirectories] = useState(["./"]);
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

    function toggleExpand(directoryPath) {
        if (expandedDirectories.includes(directoryPath)) {
            setExpandedDirectories((_expandedDirectories) => {
                return _expandedDirectories.filter((value) => {
                    return (value !== directoryPath);
                });
            });
        } else {
            setExpandedDirectories((_expandedDirectories) => {
                return [..._expandedDirectories, directoryPath];
            });
        };
    }

    function setWatchedFile(file) {
        if (!watchedFiles.includes(file.path)) {
            setWatchedFiles((_watchedFiles) => {
                return [..._watchedFiles, file.path];
            });
        }

    }

    function showResumeDialog(target, resumeTime) {
        setResumeDialogData({ target: target, resumeTime: resumeTime });
    }

    function closeResumeDialog() {
        setResumeDialogData(null);
    }

    return (
        <div className="content">
            <div className="directoryExplorer">
                <ul>
                    <DirectoryView
                        directory={mediaDirectory}
                        toggleExpand={toggleExpand}
                        playFile={setPlayingFile}
                        expandedDirectories={expandedDirectories}
                        playingFile={playingFile}
                        watchedFiles={watchedFiles}
                    ></DirectoryView>
                </ul>
            </div>
            {playingFile && <Player
                file={playingFile}
                closePlayer={closePlayer}
                setWatchedFile={setWatchedFile}
                showResumeDialog={showResumeDialog}></Player>}
            {resumeDialogData && <ResumeDialog
                isOpen={resumeDialogData != null}
                target={resumeDialogData.target}
                resumeTime={resumeDialogData.resumeTime}
                close={closeResumeDialog}
            ></ResumeDialog>}
        </div>);
};

const root = createRoot(document.getElementById('app'));
root.render(<StrictMode><App></App></StrictMode>);
