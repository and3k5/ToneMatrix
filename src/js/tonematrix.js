import '../css/tonematrix.css';
// Setup

var buttonsCount = 16;




// init 

import Vue from "vue";
import Board from "../board.vue";

new Vue(Board).$mount(".container>.board");;

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