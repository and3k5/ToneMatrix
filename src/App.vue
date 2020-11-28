<template>
    <div class="container">
        <div class="panel">
            <ul>
                <li>
                    <a id="toggle" href="#" @click="flipped = !flipped">About</a>
                </li>
                <li>
                    <a id="clear" href="#" @click="$refs.board.clear()">Clear</a>
                </li>
                <li>
                    <a id="generate" href="#" @click="$refs.board.randomize()">Generate</a>
                </li>
            </ul>
        </div>
        <div id="about" :class="{'flipped': flipped}">
            <h1>ToneMatrix</h1>
            <div>
                <dl>
                    <dt>Made by:</dt>
                    <dd>and3k5 @ github</dd>
                    <dt>Made with</dt>
                    <dd>js and css</dd>
                </dl>
            </div>
        </div>
        <board ref="board" :class="{'flipped': flipped}"></board>
    </div>
</template>

<script>
import board from "./components/board.vue";



export default {
    components: {
        board,
    },
    data() {
        return {
            flipped: false,
        };
    },
    mounted() {
        
    }
}
</script>