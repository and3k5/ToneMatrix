import '../css/tonematrix.css';
// Setup

var buttonsCount = 16;


// Note functions

// Note number to note name
// 57 = A4
var NOTENAMES = ["C?", "C#?/Db?", "D?", "D#?/Eb?", "E?", "F?", "F#?/Gb?", "G?", "G#?/Ab?", "A?", "A#?/Bb?", "B?"];
function noteToName(num) {
    return NOTENAMES[~~(num) % 12].replace(/\?/g, ~~(num / 12));
}

// Note number to frequency
// 57 = 440.0
function noteToFreq(note) {
    return 440 * Math.pow(2, (note - 57) / 12);
}

// Frequency to note number
// 440.0 = 57
function freqToNote(frequency) {
    return Math.round(12 * (Math.log(frequency / 440) / Math.log(2))) + 57;
}


// Pattern:
// C4, D4, F4, G4, A4
var Pattern = [
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

// Elements

var audioContext = new AudioContext();

var sampleRate = audioContext.sampleRate;
var sampleDuration = 0.25;
var sampleLength = sampleRate * sampleDuration;

function SineBuffer(audioContext, freq) {
    var buffer = audioContext.createBuffer(1, sampleLength, sampleRate);

    var data = buffer.getChannelData(0);


    for (var i = 0; i < sampleLength; i++) {
        // Math.random() is in [0; 1.0]
        // audio needs to be in [-1.0; 1.0]
        var ang = (i / sampleLength) * freq * (360 * sampleDuration);
        data[i] = (Math.sin(ang * Math.PI / 180) * (1 - i / sampleLength)) * Math.min(i / (sampleLength / 32), 1);
    }

    return buffer;
}

var Buffers = [];
var BufferSources = [];

var i = 0;

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

Pattern.forEach(function (n) {
    Buffers[n] = SineBuffer(audioContext, noteToFreq(n));

    i++;
})

var start = function () {
    setInterval(function () {
        var b = document.querySelector(".board");
        b.setAttribute("data-position", (parseInt(b.getAttribute("data-position")) + 1) % buttonsCount);

        var current = parseInt(b.getAttribute("data-position"));

        var q = ".board[data-position=\"" + current + "\"] .button:nth-child(" + (current + 1) + ")[data-value=on]";

        var arr = document.querySelectorAll(q);

        if (arr.length > 0) {
            var gainvalue = 1 / arr.length;

            for (var i = 0; i < arr.length; i++) {
                noteOn(arr[i], gainvalue);
            }
        }
    }, (60 / 128 / 4) * 1000)
}

function noteOn(a, v) {
    var src = audioContext.createBufferSource();
    var gain = audioContext.createGain();
    src.buffer = Buffers[parseInt(a.getAttribute("data-note"))];
    src.connect(gain);
    gain.connect(audioContext.destination);

    gain.gain.value = v * 0.70;

    src.start(0);

}

// init 

import Vue from "vue";
import Board from "../board.vue";

var board = Object.assign({}, Board, {propsData: { buttonsCount: buttonsCount, pattern: Pattern }});

new Vue(board).$mount(".container>.board");;
start();

document.querySelector("#toggle").addEventListener("click", function () {
    console.log("focus");
    var about = document.querySelector("#about");
    var board = document.querySelector(".board");

    about.classList.toggle("flipped");
    board.classList.toggle("flipped");
})

document.querySelector("#clear").addEventListener("click", function () {
    var buttons = document.querySelectorAll(".button[data-value=on]");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].setAttribute("data-value", "off");
    }

});

document.querySelector("#generate").addEventListener("click", function () {
    var buttons = document.querySelectorAll(".button[data-value=on]");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].setAttribute("data-value", "off");
    }

    buttons = document.querySelectorAll(".button");

    for (var i = 0; i < buttons.length; i++) {
        var value = "off";
        if ((Math.random() * 12345) > (Math.random() * 20000)) {
            value = "on";
        }
        buttons[i].setAttribute("data-value", value);
    }
});