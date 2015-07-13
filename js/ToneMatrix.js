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
    
    b.gain = audioContext.createGain();
    b.gain.connect(audioContext.destination);
    
    b.oscillator = audioContext.createOscillator();
    b.oscillator.frequency.value = f;
    b.oscillator.connect(b.gain);
    
    b.gain.gain.value = 0;
    
    b.oscillator.start(0);
    
    
    return b;
},
Row = function (n) {
    var r=document.createElement("div");
    r.classList.add("row");
    for (var i=0;i<buttonsCount;i++) {
        r.appendChild(Button(noteToFreq(Pattern[buttonsCount-n-1])));
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
                noteOn(arr[i].gain,gainvalue);
            }
        }
    },(60/128/4)*1000)
}

function noteOn(a,v) {
    a.gain.value = v;
    setTimeout(function () {
        a.gain.value = 0;
    },50)
}

window.addEventListener("mouseup",Button_up);