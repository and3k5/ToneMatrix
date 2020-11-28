<template>
    <div class="field">
        <label :for="id" v-if="typeof(label) === 'string' && label != ''">
            {{label}}
        </label>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        id: String,
        label: String,
    },
}
</script>