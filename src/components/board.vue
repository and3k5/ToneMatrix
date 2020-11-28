<template>
    <div class="board" :data-position="position">
        <div class="row" v-for="row in rows" v-bind:key="row.key">
            <btn
                :note="button.note"
                :model="button"
                v-for="button in row.buttons"
                v-bind:key="button.key"
                :mouseState="mouseState"
            >
            </btn>
        </div>
    </div>
</template>

<script>
import btn from "./button.vue";
import { noteOn, Pattern } from "../js/notes.js";

export default {
    components: {
        btn,
    },
    data() {
        return {
            mouseState: {
                isDown: false,
                setting: "",
            },
            position: 0,
            rows: [],
            buttonsCount: 16,
            pattern: Pattern,
        };
    },
    watch: {
        buttonsCount: {
            handler(newValue) {
                this.rows.splice(0, this.rows.length);

                for (var i = 0; i < newValue; i++) {
                    var buttons = [];
                    for (var j = 0; j < newValue; j++) {
                        buttons.push({
                            key: i + "_" + j,
                            note: this.pattern[this.buttonsCount - i - 1],
                            on: false,
                        });
                    }
                    this.rows.push({ key: i, buttons });
                }
            },
            immediate: true,
        },
    },
    methods: {
        clear() {
            this.rows.forEach(row => row.buttons.filter(btn => btn.on === true).forEach(btn => btn.on = false));
        },
        randomize() {
            var buttons = this.rows.flatMap(row => row.buttons);

            for (var i = 0; i < buttons.length; i++) {
                buttons[i].on = (Math.random() * 12345) > (Math.random() * 20000);
            }
        },
        start() {
            var comp = this;
            setInterval(function () {
                var b = document.querySelector(".board");
                comp.position = (comp.position + 1) % comp.buttonsCount;

                var current = comp.position;

                var q = `.board[data-position="${current}"] .button:nth-child(${current+1})[data-value=on]`;

                var arr = comp.rows
                    .map((row) => row.buttons[current])
                    .filter((btn) => btn.on === true);

                if (arr.length > 0) {
                    var gainvalue = 1 / arr.length;

                    for (var i = 0; i < arr.length; i++) {
                        noteOn(arr[i].note, gainvalue);
                    }
                }
            }, (60 / 128 / 4) * 1000);
        },
    },
    mounted() {
        console.log(this.buttonsCount);
        var comp = this;
        window.addEventListener("mouseup", function () {
            comp.mouseState.isDown = false;
        });
        this.start();
    },
};
</script>