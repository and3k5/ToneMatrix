<template>
    <div
        class="button"
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
</style>

<script>
export default {
    props: {
        mouseState: Object,
        note: Number,
        model: Object,
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