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
            <board ref="board" :settings="settings"></board>
        </div>
    </div>
</template>

<style lang="scss">
.container {
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    display:inline-block;
    margin:auto auto;

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

        .panel {
            position:relative;
            width:100%;
        }

        .panel ul {
            list-style-type:none;
            padding:0px;
            margin:0px;
            display:flex;
            
            width:100%;
        }

        .panel ul li {
            list-style-type:inherit;
            display:block;
            width:100px;
            height:25px;
            margin:0px 5px;
            background-image:radial-gradient(circle at 50% 0%,#505050,#303030);
            text-align:center;
            border-radius:5px;
            line-height:25px;
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