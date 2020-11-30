<template>
    <div class="board">
        <div class="row" v-for="row in rows" v-bind:key="row.key">
            <btn
                :note="button.note"
                :model="button"
                :position="position"
                v-for="button in row.buttons"
                v-bind:key="button.key"
                :mouseState="mouseState"
            >
            </btn>
        </div>
    </div>
</template>

<style lang="scss">
.board {
    padding:15px;
    border-radius:15px;
    border:solid 1px;
    background-color:#303030;
    background-image: radial-gradient(ellipse at 50% 20%, rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%);
    border-color:#404040;
    box-shadow:inset 0px 0px 15px #404040,0px 0px 15px #404040;
    transform:rotateY(0deg);
    user-select: none;

    >.row {
        display:flex;
    }
}
</style>

<script>
import btn from "./button.vue";
import { createAudioGenerator } from "../js/audio.js";
import { createNotes } from "../js/note/default.js";

export default {
    components: {
        btn,
    },
    props: {
        settings: Object,
    },
    computed: {
        buttonsCount() {
            return this.settings.buttonsCount;
        },
        rowsCount() {
            return this.settings.rowsCount;
        }
    },
    data() {
        return {
            mouseState: {
                isDown: false,
                setting: "",
            },
            position: 0,
            rows: [],
            audioGenerator: createAudioGenerator(),
        };
    },
    watch: {
        buttonsCount: {
            handler(newValue) {
                this.init(this.rowsCount, newValue);
            },
        },
        rowsCount: {
            handler(newValue) {
                this.init(newValue, this.buttonsCount);
            },
        },
    },
    methods: {
        init(rowsCount, buttonsCount) {
            this.notes = createNotes(rowsCount);
            this.audioGenerator.initBuffers(this.notes);
            this.initRowsAndButtons(rowsCount, buttonsCount);
        },
        initRowsAndButtons(rowsCount,buttonsCount) {
            this.rows.splice(0, this.rows.length);

            for (var i = 0; i < rowsCount; i++) {
                var buttons = [];
                for (var j = 0; j < buttonsCount; j++) {
                    buttons.push({
                        index: j,
                        key: i + "_" + j,
                        note: this.notes[rowsCount - i - 1],
                        on: false,
                    });
                }
                this.rows.push({ key: i, buttons });
            }
        },
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

                var arr = comp.rows
                    .map((row) => row.buttons[current])
                    .filter((btn) => btn.on === true);

                if (arr.length > 0) {
                    var gainvalue = 1 / arr.length;

                    for (var i = 0; i < arr.length; i++) {
                        comp.audioGenerator.playNote(arr[i].note, gainvalue);
                    }
                }
            }, (60 / 128 / 4) * 1000);
        },
    },
    created() {
        this.init(this.rowsCount, this.buttonsCount);
    },
    mounted() {
        var comp = this;
        window.addEventListener("mouseup", function () {
            comp.mouseState.isDown = false;
        });
        this.start();
    },
};
</script>