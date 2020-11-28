<template>
    <div class="container">
        <div class="content">
            <div class="panel">
                <ul>
                    <li v-for="overlay in overlays" :key="overlay.key">
                        <a href="#" @click="overlay.visible = !overlay.visible">{{overlay.name}}</a>
                    </li>
                    <li>
                        <a href="#" @click="$refs.board.clear()">Clear</a>
                    </li>
                    <li>
                        <a href="#" @click="$refs.board.randomize()">Generate</a>
                    </li>
                </ul>
            </div>
            <div class="overlays">
                <overlay v-for="overlay in overlays" :overlay="overlay" :key="overlay.key">
                    <component :is="overlay.component" :settings="settings"></component>
                </overlay>
            </div>
            <board ref="board" :class="{'flipped': flipped}" :settings="settings"></board>
        </div>
    </div>
</template>

<style lang="scss">
.container {
    .content {
        position:relative;
        .overlays {
            pointer-events: none;
            overflow:hidden;
            position:absolute;
            top:0px;
            left:0px;
            width:100%;
            height:100%;
        }
    }
}

</style>

<script>
import board from "./components/board.vue";
import Overlay from './components/overlay.vue';
import About from "./components/about.vue";
import Settings from './components/settings.vue';
import { createSettings } from "./js/settings.js";


export default {
    components: {
        board,
        Settings,
        About,
        Overlay,
    },
    data() {
        return {
            aboutOpen: false,
            settingsOpen: false,
            flipped: false,
            settings: createSettings(),
            overlays: [
                {
                    key: "settings",
                    name: "Settings",
                    component: Settings,
                    visible: false,
                },
                {
                    key: "about",
                    name: "About",
                    component: About,
                    visible: false,
                }
            ]
        };
    },
    mounted() {
        
    }
}
</script>