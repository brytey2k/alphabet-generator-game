const createUtterance = (text, rate = 0.8) => {
    // use chrome speech synthesis API to ask user what letter is this
    const utterance = new SpeechSynthesisUtterance(text);
    // set a different voice
    utterance.voice = speechSynthesis.getVoices()[0];
    // slow down the speech
    utterance.rate = rate;

    return utterance
}

const speak = (utterance) => {
    // speak the utterance
    speechSynthesis.speak(utterance);
}

const cancelSpeech = () => {
    speechSynthesis.cancel();
}

export {
    createUtterance,
    speak,
    cancelSpeech
};