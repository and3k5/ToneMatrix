import { makeScales, getBestOctavesByRatingScore, makeOctaveRating } from "../notes.js";

// this is rated by me hearing frequencies as a sine wave.. might be different for other waveforms
function calculateScore(octave) {
    var score = 0;
    if (octave.index < 2) {
        // difficult to hear
        score -= 0.125;
    }
    if (octave.index < 4) {
        // less easy to hear
        score -= 0.125;
    }
    if (octave.index > 8) {
        let rate = 4;
        // the higher the index, the more 'painful' it is
        rate *= (octave.index - 8);
        if (octave.partial === true) {
            rate *= octave.keys/12;
        }
        
        // more pain than anything else
        score -= 2 * rate;
    }
    return score;
}

const scale = [0,2,3,2,2];

export function createNotes(buttons) {
    const keysPerOctave = scale.length;
    const octavesNeeded = buttons / keysPerOctave;
    const wholeOctavesNeeded = Math.floor(octavesNeeded);
    const additionalKeys = Math.round(keysPerOctave * (octavesNeeded - wholeOctavesNeeded));
    var octaveRatings = [];

    const highestBaseOctave = Math.max(9, Math.ceil(octavesNeeded));

    for (var baseOct = 0;baseOct < highestBaseOctave;baseOct++) {
        const octaveRating = makeOctaveRating(baseOct, wholeOctavesNeeded, additionalKeys, calculateScore);
        octaveRatings.push(octaveRating);
    }

    var bestOctaves = getBestOctavesByRatingScore(octaveRatings);

    var scales = makeScales(bestOctaves, scale);
    return scales;
}