// Setup

var buttonsCount = 16;


// Note functions

// Note number to note name
// 57 = A4
var NOTENAMES = ["C?","C#?/Db?","D?","D#?/Eb?","E?","F?","F#?/Gb?","G?","G#?/Ab?","A?","A#?/Bb?","B?"];
function noteToName(num) {
    return NOTENAMES[~~(num)%12].replace(/\?/g,~~(num/12));
}

// Note number to frequency
// 57 = 440.0
function noteToFreq(note) {
    return 440*Math.pow(2,(note-57)/12);
}

// Frequency to note number
// 440.0 = 57
function freqToNote(frequency) {
    return Math.round(12*(Math.log(frequency/440)/Math.log(2))) + 57;
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

var MouseIsDown = false, Setting="";


// dragleave dragend
var Button_dragleaveend = function (e) {
    return false;
}
;


var Button_dragover = function (e) {
    try {
        e.preventDefault();
    }
    catch (e) {
        
    }
    if (MouseIsDown) {
        this.setAttribute("data-value",Setting);
    }
    return false;
}

var Button_down = function (e) {
   
    try {
        e.preventDefault();
    }
    catch (e) {
        
    }
   
   var newvalue="on";
   
   if (this.getAttribute("data-value")=="on") {
       newvalue="off";
   }
   
   this.setAttribute("data-value",newvalue);
   
   MouseIsDown=true;
   
   Setting = this.getAttribute("data-value");
   
   return false;
}

var Button_up = function () {
    MouseIsDown = false;
}




var audioContext = new AudioContext();

var sampleRate = audioContext.sampleRate;
var sampleDuration = 0.25;
var sampleLength = sampleRate*sampleDuration;

function SineBuffer(audioContext,freq) {
    var buffer = audioContext.createBuffer(1, sampleLength, sampleRate);
    
    var data = buffer.getChannelData(0);
    
    
    for (var i = 0; i < sampleLength; i++) {
        // Math.random() is in [0; 1.0]
        // audio needs to be in [-1.0; 1.0]
        var ang = (i/sampleLength)*freq*(360*sampleDuration);
        data[i] = Math.sin(ang*Math.PI/180)*(1-i/sampleLength);
    }
  
    return buffer;
}

var Buffers = [];
var BufferSources = [];

var i=0;

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
    Buffers[n]=SineBuffer(audioContext,noteToFreq(n));
    
    i++;
})

var Button = function (f) {
    var b=document.createElement("div");
    b.classList.add("button");
    b.draggable=false;
    b.setAttribute("draggable","false");
    b.setAttribute("data-value","off");
    b.addEventListener("dragover",Button_dragover);
    b.addEventListener("mouseover",Button_dragover);
    b.addEventListener("dragleave",Button_dragleaveend);
    b.addEventListener("dragend",Button_dragleaveend);
    b.addEventListener("mousedown",Button_down);
    b.addEventListener("mouseup",Button_up);
    
    b.setAttribute("data-note",f);
    /*b.gain = audioContext.createGain();
    b.gain.connect(audioContext.destination);
    
    b.oscillator = audioContext.createOscillator();
    b.oscillator.frequency.value = f;
    b.oscillator.connect(b.gain);
    
    b.gain.gain.value = 0;
    
    b.oscillator.start(0);*/
    
    
    return b;
},
Row = function (n) {
    var r=document.createElement("div");
    r.classList.add("row");
    for (var i=0;i<buttonsCount;i++) {
        r.appendChild(Button((Pattern[buttonsCount-n-1])));
    }
    return r;
},
Board = function () {
    var b=document.createElement("div");
    b.classList.add("board");
    b.setAttribute("data-position","0");
    for (var i=0;i<buttonsCount;i++) {
        b.appendChild(Row(i));
    }
    return b;
}


var start = function () {
    setInterval(function () {
        var b=document.querySelector(".board");
        b.setAttribute("data-position",(parseInt(b.getAttribute("data-position"))+1)%buttonsCount);
        
        var current = parseInt(b.getAttribute("data-position"));
        
        var q=".board[data-position=\""+current+"\"] .button:nth-child("+(current+1)+")[data-value=on]";
        
        var arr=document.querySelectorAll(q);
        
        if (arr.length>0) {
            var gainvalue = 1/arr.length;
            
            // hacky
            for (var i=0;i<arr.length;i++) {
                //var row = Array.prototype.indexOf.call(arr[i].parentElement.parentElement.children,arr[i].parentElement);
                //console.log(row);
                noteOn(arr[i],gainvalue);
            }
        }
    },(60/128/4)*1000)
}

function noteOn(a,v) {
    var src = audioContext.createBufferSource();
    var gain = audioContext.createGain();
    src.buffer = Buffers[parseInt(a.getAttribute("data-note"))];
    src.connect(gain);
    gain.connect(audioContext.destination);
    
    gain.gain.value = v*0.70;
    
    src.start(0);
    
}

window.addEventListener("mouseup",Button_up);