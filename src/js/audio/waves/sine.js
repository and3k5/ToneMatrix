export default function SineBuffer(audioContext, freq, sampleDuration) {
    var sampleLength = audioContext.sampleRate * sampleDuration;
    var buffer = audioContext.createBuffer(1, sampleLength, audioContext.sampleRate);

    var data = buffer.getChannelData(0);


    for (var i = 0; i < sampleLength; i++) {
        // Math.random() is in [0; 1.0]
        // audio needs to be in [-1.0; 1.0]
        var ang = (i / sampleLength) * freq * (360 * sampleDuration);
        data[i] = (Math.sin(ang * Math.PI / 180) * (1 - i / sampleLength)) * Math.min(i / (sampleLength / 32), 1);
    }

    return buffer;
}