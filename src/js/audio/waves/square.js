export default function SquareBuffer(audioContext, freq, sampleDuration) {
    var sampleLength = audioContext.sampleRate * sampleDuration;
    var buffer = audioContext.createBuffer(1, sampleLength, audioContext.sampleRate);

    var data = buffer.getChannelData(0);


    for (var i = 0; i < sampleLength; i++) {
        // Math.random() is in [0; 1.0]
        // audio needs to be in [-1.0; 1.0]
        var ang = (i / sampleLength) * freq * (360 * sampleDuration);
        var val = (Math.sin(ang * Math.PI / 180) * (1 - i / sampleLength)) * Math.min(i / (sampleLength / 32), 1);
        if (val > 0) {
            val = 1;
        }else if (val < 0) {
            val = -1;
        }else{
            val = 0;
        }
        data[i] = val;
    }

    return buffer;
}