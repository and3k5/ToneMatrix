// Note functions

// Note number to note name
// 57 = A4
var NOTENAMES = ["C?", "C#?/Db?", "D?", "D#?/Eb?", "E?", "F?", "F#?/Gb?", "G?", "G#?/Ab?", "A?", "A#?/Bb?", "B?"];
export function noteToName(num) {
    return NOTENAMES[~~(num) % 12].replace(/\?/g, ~~(num / 12));
}

// Note number to frequency
// 57 = 440.0
export function noteToFreq(note) {
    return 440 * Math.pow(2, (note - 57) / 12);
}

// Frequency to note number
// 440.0 = 57
export function freqToNote(frequency) {
    return Math.round(12 * (Math.log(frequency / 440) / Math.log(2))) + 57;
}

export const KeysPerOctave = 12;

export function makeOctaves(from,count, additionalKeys) {
    var result = [];
    for (var i = 0;i<count;i++) {
        result.push({index: from+i, partial: false});
    }
    if (typeof(additionalKeys) === "number" && additionalKeys > 0)
        result.push({index: from+count, partial: true, keys: additionalKeys });
    return result;
}

export function calculateOctavesScore(octaves, func) {
    return octaves.reduce((score, oct) => score + func(oct), 0);
}

export function makeScale(octave, scale) {
    var start = octave.index * KeysPerOctave;
    var lastNote = start;
    var result = [];
    var notes = octave.partial === true ? octave.keys : scale.length;
    for (var i = 0;i<notes;i++) {
        var r = scale[i];
        var note = lastNote + r;
        result.push(note);
        lastNote = note;
    }
    return result;
}

export function makeScales(octaves, scale) {
    return octaves.flatMap(octave => makeScale(octave, scale));
}

export function makeOctaveRating(baseOctave, octaveCount, additionalKeys, score) {
    const octaves = makeOctaves(baseOctave, octaveCount, additionalKeys);
    return {
        octaves,
        score: calculateOctavesScore(octaves, score),
    };
}

function diffToRelative(diff) {
    if (diff > 0)
        return 1;
    if (diff < 0)
        return -1;
    return 0;
}

export function getOrderedOctaveRatingsByScore(octaveRatings) {
    return octaveRatings.concat().sort((a,b) => {
        const scoreDifference = diffToRelative(a.score - b.score);
        if (scoreDifference !== 0)
            return scoreDifference;
        const lowestOctaveA = a.octaves[0];
        const lowestOctaveB = b.octaves[0];
        const indexDifference = diffToRelative(lowestOctaveA.index - lowestOctaveB.index) * -1;
        return indexDifference;
    });
}

export function getBestOctaveRatingByScore(octaveRatings) {
    var ordered = getOrderedOctaveRatingsByScore(octaveRatings);
    return ordered[ordered.length - 1];
}

export function getBestOctavesByRatingScore(octaveRatings) {
    var best = getBestOctaveRatingByScore(octaveRatings);
    return best.octaves;
}

//const oct

// Pattern:
// C4, D4, F4, G4, A4
const Pattern = [
    48, // +3
    50, // +2
    53, // +3
    55, // +2
    57, // +2

    60,
    62,
    65,
    67,
    69,

    72,
    74,
    77,
    79,
    81,

    84,
    86,
    89,
    91,
    93,

    96];