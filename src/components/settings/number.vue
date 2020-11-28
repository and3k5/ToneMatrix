<template>
    <field :id="id" :label="definition.name">
        <input type="number" :id="id" v-model.number="value">
    </field>
</template>

<script>
import field from "../settings-field.vue";
import { createUniqueId } from "../../js/dom-helpers.js";
export default {
    props: {
        definition: Object,
        settings: Object,
    },
    computed: {
        value: {
            get() {
                return this.settings[this.definition.name];
            },
            set(v) {
                this.settings[this.definition.name] = v;
            }
        }
    },
    components: {
        field,
    },
    data() {
        return {
            id: createUniqueId(),
        }
    }
}
</script>