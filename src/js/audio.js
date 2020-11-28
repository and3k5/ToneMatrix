import { noteToFreq } from "./notes";

function SineBuffer(audioContext, freq, sampleDuration) {
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



export function createAudioGenerator() {
    var audioContext = new AudioContext();
    var sampleDuration = 0.25;
    

    var Buffers = [];
    var BufferSources = [];

    var i = 0;

    return {
        getBuffer(n) {
            if (Buffers[n] == null) {
                Buffers[n] = SineBuffer(audioContext, noteToFreq(n), sampleDuration);
            }
            return Buffers[n];
        },
        initBuffers(Pattern) {
            Pattern.forEach((n) => this.getBuffer(n))
        },
        mainVolume: 0.7,
        playNote(note, v) {
            var src = audioContext.createBufferSource();
            var gain = audioContext.createGain();
            src.buffer = this.getBuffer(note);
            src.connect(gain);
            gain.connect(audioContext.destination);
        
            gain.gain.value = v * this.mainVolume;
        
            src.start(0);
        
        }
    }
}

/*function DynamicBufferSource(buffer) {
    this.buffer = buffer;
    
    Object.defineProperty(this,"bufferSource",{
        get: function () {
            return this._bufferSource;
        },
        set: function (v) {
            this._bufferSource=v;
            v.buffer=this.buffer;
        }
    })
    
    this.bufferSource = audioContext.createBufferSource();
    
    this.start = function (v) {
        try {
            this.bufferSource.stop(v)
            this.bufferSource.disconnect();
        }
        catch (e) {
            
        }
        this.bufferSource = audioContext.createBufferSource();
        
        this.bufferSource.start(v);
        var dbs = this;
        this.bufferSource.onended = function () {
            console.log("ended");
            dbs.stop(0);
        }
    }
    
    this.stop = function (v) {
        this.bufferSource.stop(v)
        this.bufferSource.disconnect();
        this.bufferSource = audioContext.createBufferSource();
    }
}*/



