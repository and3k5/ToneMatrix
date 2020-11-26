<template>
    <div class="board" data-position="0">
        <div class="row" v-for="i in buttonsCount" v-bind:key="i">
            <btn :note="(pattern[buttonsCount - i - 1])" v-for="j in buttonsCount" v-bind:key="j" :mouseState="mouseState">

            </btn>
        </div>
    </div>
</template>

<script>
import btn from "./button.vue";
export default {
    components: {
        btn,
    },
    data() {
        return {
            mouseState: {
                isDown: false,
                setting: "",
            }
        }
    },
    props: {
        buttonsCount: Number,
        pattern: Array,
    },
    mounted() {
        console.log(this.buttonsCount);
        var comp = this;
        window.addEventListener("mouseup",function () {
            comp.mouseState.isDown = false;
        });
    }
}
</script>