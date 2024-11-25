import './index.css';
import DirectoryView from './components/directoryView.js';
import Player from './components/player.js';
import Background from './components/background.js';

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
        <>
            <Background />
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
                    updateProgress={updateProgress}
                    playingFileProgress={progressPerMovie.get(playingFile.path)}
                    mediaDirectory={mediaDirectory}
                />}

            </div>
        </>
    );
};

const root = createRoot(document.getElementById('app'));
root.render(<StrictMode><App></App></StrictMode>);
