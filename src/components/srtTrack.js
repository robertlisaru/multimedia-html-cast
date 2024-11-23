import { useState, useEffect } from "react";

const SrtTrack = ({ path, isDefault = false }) => {

    const [trackUrl, setTrackUrl] = useState(null);

    useEffect(() => {
        const fetchAndConvertSRT = async () => {
            try {
                const response = await fetch(path);
                if (!response.ok) {
                    throw new Error("Failed to fetch " + path);
                }

                const arrayBuffer = await response.arrayBuffer();

                const decoder = new TextDecoder("iso-8859-2");
                const srtContent = decoder.decode(arrayBuffer);

                const vttContent = convertSRTtoVTT(srtContent);

                const blob = new Blob([vttContent], { type: "text/vtt" });
                const vttURL = URL.createObjectURL(blob);

                setTrackUrl(vttURL);

                // Clean up the Blob URL when the component unmounts
                return () => {
                    URL.revokeObjectURL(vttURL);
                };
            } catch (error) {
                console.error("Error processing subtitle:", error);
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

    return trackUrl && <track src={trackUrl}
        kind="subtitles"
        label="subtitle"
        {...(isDefault && { default: true })} />

};

export default SrtTrack;