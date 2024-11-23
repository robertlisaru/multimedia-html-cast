import { useState, useEffect } from "react";
import { franc } from 'franc';
const convert3To1 = require('iso-639-3-to-1');
import Iso639Type from 'iso-639-language';

const SrtTrack = ({ path, isDefault = false }) => {

    const [trackUrl, setTrackUrl] = useState(null);
    const [languageCode, setLanguageCode] = useState(null);
    const [languageName, setLanguageName] = useState(null);

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

                const iso639_3 = franc(srtContent); // Detect ISO 639-3 code
                if (iso639_3 === "und") {
                    setLanguageCode(null);
                    setLanguageName("Unknown")
                } else {
                    const iso639_1 = convert3To1(iso639_3);
                    setLanguageCode(iso639_1);
                    setLanguageName(Iso639Type.getType(1).getNameByCodeNative(iso639_1));
                }

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
        srcLang={languageCode}
        label={languageName}
        {...(isDefault && { default: true })} />

};

export default SrtTrack;