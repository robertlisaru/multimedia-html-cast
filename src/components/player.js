import { useRef, useState, useEffect } from "react";

const Player = (props) => {
    const { file, closePlayer, showResumeDialog, updateProgress, playingFileProgress } = props;
    const normalizedPath = file.path.replace(/[\\/]+/g, '/');
    const vttSubtitlePath = normalizedPath.slice(0, normalizedPath.lastIndexOf(".")) + ".vtt";
    const srtSubtitlePath = normalizedPath.slice(0, normalizedPath.lastIndexOf(".")) + ".srt";
    const lastSaved = useRef(0);

    const [vttFromSrtUrl, setVttFromSrtUrl] = useState(null);

    useEffect(() => {
        const fetchAndConvertSRT = async () => {
            try {
                const response = await fetch(srtSubtitlePath);
                if (!response.ok) {
                    throw new Error("Failed to fetch the SRT file");
                }

                const arrayBuffer = await response.arrayBuffer();

                const decoder = new TextDecoder("iso-8859-2");
                const srtContent = decoder.decode(arrayBuffer);


                const vttContent = convertSRTtoVTT(srtContent);

                const blob = new Blob([vttContent], { type: "text/vtt" });
                const vttURL = URL.createObjectURL(blob);

                setVttFromSrtUrl(vttURL);

                // Clean up the Blob URL when the component unmounts
                return () => {
                    URL.revokeObjectURL(vttURL);
                };
            } catch (error) {
                console.error("Error processing the SRT file:", error);
            }
        };

        fetchAndConvertSRT();
    }, []);

    const convertSRTtoVTT = (srt) => {
        let vtt = "WEBVTT\n\n";

        vtt += srt
            .replace(/\r/g, "") // Remove carriage returns
            .replace(/(\d+:\d+:\d+),(\d+)/g, "$1.$2"); // Replace commas with periods in timestamps

        return vtt;
    };

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
            <track src={vttSubtitlePath}
                kind="subtitles"
                label="vtt"
            >

            </track>
            <track src={vttFromSrtUrl}
                kind="subtitles"
                label="vtt from srt"
                default>

            </track>
        </video>
        {props.children}
    </div >;
};

export default Player;