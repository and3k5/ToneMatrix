<template>
    <div class="settings">
        <template v-for="definition in definitions">
            <component :is="definition.component" :key="definition.name" :definition="definition" :settings="settings"></component>
        </template>
    </div>
</template>

<script>
import { Settings } from "../js/settings.js";

export default {
    computed: {
        definitions() {
            return Settings;
        }
    },
    props: {
        settings: Object,
    }
}
</script>