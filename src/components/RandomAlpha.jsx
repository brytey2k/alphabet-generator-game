import {useCallback, useEffect, useMemo, useState} from "react";
import {cancelSpeech, createUtterance, speak} from "../lib/textToSpeech.js";
import {generateAlphabets} from "../lib/alphabetGenerator.js";

const RandomAlpha = () => {
    const alphabets = useMemo(generateAlphabets, []);

    const generateRandomAlphabet = useCallback(() => {
        return alphabets[Math.floor(Math.random() * alphabets.length)];
    }, [alphabets]);

    const [randomAlphabet, setRandomAlphabet] = useState(generateRandomAlphabet());

    useEffect(() => {
        speak(createUtterance('What letter is this?'));

        const handleKeyDown = (event) => {
            // cancel speech if it is in progress
            cancelSpeech();

            if (event.key === randomAlphabet.toLowerCase()) {
                speak(createUtterance('Yay!!', 0.5));

                setRandomAlphabet(generateRandomAlphabet());
                return;
            }

            speak(createUtterance('No!!', 0.7));
        };

        document.addEventListener('keydown', handleKeyDown);

        // stop the speech when the component unmounts
        return () => {
            // cancelSpeech();
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [generateRandomAlphabet, randomAlphabet]);


    return (
        <>
            <h1 className="random-alphabet-display">{ randomAlphabet }</h1>
        </>
    );
}

export default RandomAlpha;