<template>
    <div class="button" :data-note="note" draggable="false" :data-value="dataValue" @dragover="dragover" @mouseover="dragover" @dragleave="dragleaveend" @dragend="dragleaveend" @mousedown="down" @mouseup="up">

    </div>
</template>

<script>
export default {
    props: {
        mouseState: Object,
        note: String,
    },
    data() {
        return {
            dataValue: "off",
        }
    },
    methods: {
        dragleaveend(e) {
            return false;
        },
        dragover(e) {
            try {
                e.preventDefault();
            }
            catch (e) {

            }
            if (this.mouseState.isDown) {
                this.dataValue = this.mouseState.setting;
            }
            return false;
        },
        down(e) {
            try {
                e.preventDefault();
            }
            catch (e) {

            }

            var newvalue = "on";

            if (this.dataValue == "on") {
                newvalue = "off";
            }

            this.dataValue = newvalue;

            this.mouseState.isDown = true;

            this.mouseState.setting = this.dataValue;

            return false;
        },
        up(e) {
            this.mouseState.isDown = false;
        }
    }
}
</script>