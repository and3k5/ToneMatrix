<template>
    <div
        :class="{'button': true, 'playing': model.on === true && position === model.index}"
        :data-note="note"
        draggable="false"
        :data-value="model.on ? 'on' : 'off'"
        @dragover="dragover"
        @mouseover="dragover"
        @dragleave="dragleaveend"
        @dragend="dragleaveend"
        @mousedown="down"
        @mouseup="up"
    ></div>
</template>

<style lang="scss">
.button {
    user-select: none;
    width: 30px;
    height: 30px;
    margin: 2px;
    border-radius: 2px;
    background-image: radial-gradient(
        ellipse at center,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.22) 100%
    );
    transition: background-color 100ms;
}

.button[data-value=off] {
    background-color:#666666;
}

.button[data-value=on] {
    background-color:#CCCCCC;
    box-shadow:inset 0px 0px 5px white,0px 0px 5px white;
}

.button.playing {
    box-shadow:inset 0px 0px 5px black,0px 0px 15px white;
    background-color:white;
}
</style>

<script>
export default {
    props: {
        mouseState: Object,
        note: Number,
        model: Object,
        position: Number,
    },
    data() {
        return {};
    },
    methods: {
        dragleaveend(e) {
            return false;
        },
        dragover(e) {
            try {
                e.preventDefault();
            } catch (e) {}
            if (this.mouseState.isDown) {
                this.model.on = this.mouseState.setting;
            }
            return false;
        },
        down(e) {
            try {
                e.preventDefault();
            } catch (e) {}

            var newvalue = true;

            if (this.model.on === true) {
                newvalue = false;
            }

            this.model.on = newvalue;

            this.mouseState.isDown = true;

            this.mouseState.setting = this.model.on;

            return false;
        },
        up(e) {
            this.mouseState.isDown = false;
        },
    },
};
</script>